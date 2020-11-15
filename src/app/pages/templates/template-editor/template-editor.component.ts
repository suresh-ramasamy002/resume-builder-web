import {Component, OnInit, HostListener, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {TemplateRootComponent} from '../template-root.component';
import {CoreDataService} from '../../../services/core-data.service';
import {AuthService} from '../../../services/auth.service';
import {ConfirmDialogComponent} from '../../../components/confirm-dialog/confirm-dialog.component';
import {CompanyInfo} from '../../../class';
import {EduInfo} from '../../../class';
import {Certifications} from '../../../class';
import {DomSanitizer} from '@angular/platform-browser';
import html2pdf from 'html2pdf.js';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase/app';
import {HonorAwardsInfo} from '../../../class';
import {ActivitiesInfo} from '../../../class';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ImageUploadCropComponent} from '../../../components/image-upload-crop/image-upload-crop.component';
import {PaymentRequestComponent} from '../../../components/payment-request/payment-request.component';
import {DownloadWarningDialogComponent} from '../../../components/download-warning-dialog/download-warning-dialog.component';
import {FeedbackFormComponent} from '../../../components/feedback-form/feedback-form.component';
import {PdfViewerComponent} from '../../../components/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit, OnDestroy {
  private PDF_EXTENSION = '.pdf';
   @ViewChild('templateFile') template: ElementRef;
   public themeColor =  [];
   private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
   public fontFamily = ['Arial', 'Book Antiqua', 'Calibri', 'Cambria', 'Didot', 'Garamond', 'Georgia', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private sanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.userService.getResumeDetails(this.aId);
    if ('selectedTemplate' in localStorage) {
      this.coreDataService.selectedTemplate = localStorage.getItem('selectedTemplate');
      this.setThemePerTemplate(this.coreDataService.selectedTemplate);
    }
    this.coreDataService.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if ('templateData' in localStorage) {
      this.coreDataService.templateData = JSON.parse(localStorage.getItem('templateData'));
    }
    window.onbeforeunload = (() => {
      localStorage.setItem('templateData', JSON.stringify(this.coreDataService.templateData));
      localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
      localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    });

    if ('selectedTemplateTheme' in localStorage) {
      this.coreDataService.templateData.templateTheme = localStorage.getItem('selectedTemplateTheme');
    }
    this.coreDataService.templateData.fontFamily = 'Verdana';
  }
  setThemePerTemplate(templateName) {
    this.themeColor = [];
    switch (templateName) {
      case 'template-one': this.themeColor = [
        { name: 'Blue', value: '#353f58' },
        { name: 'Blue Grey', value: '#607D8B' },
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-two': this.themeColor = [
        { name: 'Blue', value: '#353f58' },
        { name: 'Brown', value: '#414141' },
        { name: 'Grey', value: '#f3f3f3' },
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-three': this.themeColor = [
        { name: 'Blue', value: '#353f58' },
        { name: 'Blue Grey', value: '#607D8B'},
        { name: 'Brown', value: '#414141' },
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-four': this.themeColor = [
        { name: 'Blue', value: '#353f58' },
        { name: 'Blue Grey', value: '#607D8B'},
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-five': this.themeColor = [
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-six': this.themeColor = [
        { name: 'Blue', value: '#353f58' },
        { name: 'Blue Grey', value: '#607D8B' },
        { name: 'Black', value: '#343b46' }];
        break;
      case 'template-seven': this.themeColor = [
        { name: 'Blue', value: '#414141' },
        { name: 'Blue Grey', value: '#353f58' },
        { name: 'Black', value: '#343b46'}];
        break;
      case 'template-eight': this.themeColor = [
        { name: 'Blue', value: '#414141' },
        { name: 'Blue Grey', value: '#353f58' },
        { name: 'Black', value: '#343b46'}];
        break;
    }
    return this.themeColor;
  }
  setTickColor(colorVal) {
    let color = '#292929';
   switch(colorVal) {
     case '#343b46': color = '#ffffff';
     break;
     case '#353f58': color = '#ffffff';
     break;
     case '#414141': color = '#ffffff';
       break;
    }
    return color;
  }
  ngOnDestroy() {
    this.coreDataService.templateData.image = null;
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    this.userService.addUpdateUserResumeData(firebase.auth().currentUser.uid);
  }
  openPaymentDialog(): void {
    if (this.coreDataService.userDetails.role === 'PRO_ADMIN_1' || this.coreDataService.userDetails.role === 'CO_ADMIN_1' || this.coreDataService.selectedTemplate === 'template-one' || this.coreDataService.selectedTemplate === 'template-two' || this.coreDataService.selectedTemplate === 'template-four') {
      this.exportRightNow();
    } else {
      let dialogRef = this.dialog.open(PaymentRequestComponent, {
        width: '350px',
        data: {amount: 1500}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.exportHtmlTableDataToPdf(this.coreDataService.selectedTemplate, this.coreDataService.templateData.title);
        }
      });
    }
  }
  exportToPdf() {
    let dialogRef = this.dialog.open(DownloadWarningDialogComponent, {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.openPaymentDialog();
        } else {}
      });
  }
  exportRightNow() {
    this.coreDataService.showSpinner = true;
    this.exportHtmlTableDataToPdf(this.coreDataService.selectedTemplate, this.coreDataService.templateData.title);
  }
  exportHtmlTableDataToPdf(element, fileName: string) {
    let opt = {
      margin: 0,
      padding: 0,
      filename: fileName.replace(' ', '-') + '-resumearc.pdf',
      image: {type: 'jpg', quality: 0.99},
      html2canvas: {dpi: 192, letterRendering: true, useCORS: true},
      jsPDF: {unit: 'pt', format: 'letter', orientation: 'portrait', scale: 0
      }};
    html2pdf().from(document.getElementById(element)).set(opt).save().then((e) => {
      this.coreDataService.showSpinner = false;
      this.coreDataService.resumeDownloadedData.forEach(resumeData => {
        if (resumeData.name === element) {
          resumeData.count++;
        }
      });
      this.userService.setResumeDetails(this.aId);
      if (this.coreDataService.userDetails.role !== 'PRO_ADMIN_1' && this.coreDataService.userDetails.role !== 'CO_ADMIN_1') {
        this.openFeedbackDialog();
      }
    });
  }
  openFeedbackDialog() {
    let amt = (this.coreDataService.selectedTemplate !== 'template-one' && this.coreDataService.selectedTemplate !== 'template-two' && this.coreDataService.selectedTemplate !== 'template-four') ? 15 : 0;
    let dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '350px',
      data: {selectedTemplate: this.coreDataService.selectedTemplate, price: amt}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {}
    });
  }

  // logoutUser() {
  //   this.auth.logout();
  // }
  // @HostListener('window:beforeunload', ['$event'])
  // preventReload(event) {
  //     let confirmationMessage = "\o/";
  //     event.returnValue = confirmationMessage;    // Gecko, Trident, Chrome 34+
  //     return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // }
  selectedTemplate(templateName, theme) {
    this.coreDataService.selectedTemplate = templateName;
    this.coreDataService.templateData.templateTheme = theme;
    this.setThemePerTemplate(this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
  }
  changeTheme(colorValue) {
    this.coreDataService.templateData.templateTheme = colorValue;
    localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
  }
  changeFontSize(size) {
    this.coreDataService.templateData.fontSize = Number(size);
    switch(size) {
      case '1':
        this.coreDataService.templateData.titleSize = 18;
        this.coreDataService.templateData.roleSize = 14;
        this.coreDataService.templateData.normalSize = 12;
        break;
      case '2':
        this.coreDataService.templateData.titleSize = 20;
        this.coreDataService.templateData.roleSize = 15;
        this.coreDataService.templateData.normalSize = 14;
        break;
      case '3':
        this.coreDataService.templateData.titleSize = 20;
        this.coreDataService.templateData.roleSize = 16;
        this.coreDataService.templateData.normalSize = 15;
        break;
    }
  }
  addWorkExperience() {
    this.coreDataService.templateData.companyInfo.push({companyName: 'NAME OF YOUR COMPANY', workFromTo: 'From - To date/present', role: 'Job position', details: ['Job\'s professional history, key experience and achievements']});
  }
  deleteCompanyInfo(i) {
    this.coreDataService.templateData.companyInfo.splice(i, 1);
  }
  addAcheivement(i) {
    this.coreDataService.templateData.companyInfo[i].details.push('Job\'s professional history, key experience and achievements');
  }
  deleteAcheivement(i, j) {
    this.coreDataService.templateData.companyInfo[i].details.splice(j, 1);
  }
  addEducation() {
    this.coreDataService.templateData.educationInfo.push({schoolName: 'FULL NAME OF UNIVERSITY/ORGANIZATION', department: 'Your major/Name of your course', yearFromTo: 'From - To date/present', gpa: 'GPA, some subject'});
  }
  deleteEduInfo(i) {
    this.coreDataService.templateData.educationInfo.splice(i, 1);
  }
  addCerficates() {
    this.coreDataService.templateData.certificates.push({certificateName: 'Areas of certification relevant to the position', year: 'Year'});
  }
  deleteCerficates(i) {
    this.coreDataService.templateData.certificates.splice(i, 1);
  }
  addAwards() {
    this.coreDataService.templateData.honorAwardInfo.push({year: 'Year', award: 'Sample awards\'s'});
  }
  deleteAwards(i) {
    this.coreDataService.templateData.honorAwardInfo.splice(i, 1);
  }
  removeImage() {
    this.coreDataService.templateData.image = null;
  }
  addInterest() {
    this.coreDataService.templateData.interestOn.push('New Interest');
  }
  deleteInterest(i) {
    this.coreDataService.templateData.interestOn.splice(i, 1);
  }
  deleteLangauge(i) {
    this.coreDataService.templateData.knownLanguage.splice(i, 1);
  }
  deleteTechSkills(i) {
    this.coreDataService.templateData.technicalSkills.splice(i, 1);
  }
  deleteCsSkills(i) {
    this.coreDataService.templateData.computerSkills.splice(i, 1);
  }
  addLanguage() {
    this.coreDataService.templateData.knownLanguage.push({skill: 'New Skills', rate: 0});
  }
  addTechSkills() {
    this.coreDataService.templateData.technicalSkills.push({skill: 'New Skills', rate: 0});
  }
  addComputerSkills() {
    this.coreDataService.templateData.computerSkills.push({skill: 'New Skills', rate: 0});
  }
  addActivities() {
    this.coreDataService.templateData.activitiesInfo.push({place: 'Activity Organization', role: 'Sample Position', year: 'From - To date/present', summary: ['Sample activities description']});
  }
  deleteActivityInfo(i) {
    this.coreDataService.templateData.activitiesInfo.splice(i, 1);
  }
  deleteActivitySummary(i, k) {
    this.coreDataService.templateData.activitiesInfo[i].summary.splice(k, 1);
  }
  addActivitySummary(i) {
    this.coreDataService.templateData.activitiesInfo[i].summary.push('New Summary');
  }
  addAdditionalInfo(){
    this.coreDataService.templateData.additionalInfoDetails.push('Sample Additional Info');
  }
  deleteAdditionalInfo(i){
    this.coreDataService.templateData.additionalInfoDetails.splice(i, 1);
  }
  addReference(){
    this.coreDataService.templateData.referenceDetails.push('Reference\'s Content');
  }
  deleteReference(i){
    this.coreDataService.templateData.referenceDetails.splice(i, 1);
  }
sanitizeUrl(url) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
verifyPdfFile(selectedElement) {
      let opt = {
        margin: 0,
        image: {type: 'jpeg', quality: 0.99},
        html2canvas: {dpi: 192, letterRendering: true},
        jsPDF: {unit: 'pt', format: 'letter', orientation: 'portrait'}
      };
      this.coreDataService.showSpinner = true;
      html2pdf().from(document.getElementById(selectedElement)).set(opt).toPdf().get('pdf').then((pdf) => {
        let dialogRef = this.dialog.open(PdfViewerComponent, {
          width: '96vw',
          maxWidth: '96vw',
          data: {src: pdf.output('bloburl')}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          } else {}
        });
      });
    }
}

