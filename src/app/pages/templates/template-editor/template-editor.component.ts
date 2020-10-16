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
@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit, OnDestroy {
  private PDF_EXTENSION = '.pdf';
   @ViewChild('templateFile') template: ElementRef;
   public themeColor =  [
     { name: 'Purple', value: '#9C27B0' },
     { name: 'Deep Purple', value: '#673AB7' },
     { name: 'Indigo', value: '#3F51B5' },
     { name: 'Blue', value: '#2196F3' },
     { name: 'Light Blue', value: '#03A9F4' },
     { name: 'Cyan', value: '#00BCD4' },
     { name: 'Teal', value: '#009688' },
     { name: 'Green', value: '#4CAF50' },
     { name: 'Light Green', value: '#8BC34A' },
     { name: 'Lime', value: '#CDDC39' },
     { name: 'Brown', value: '#795548' },
     { name: 'Grey', value: '#9E9E9E' },
     { name: 'Blue Grey', value: '#607D8B' },
     { name: 'Black', value: '#292929' }
   ];
   public fontFamily = ['Arial', 'Arial Narrow', 'Book Antiqua', 'Calibri', 'Cambria', 'Didot', 'Garamond',  'Times New Roman', 'Trebuchet MS', 'Verdana'];
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private sanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.coreDataService.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if ('templateData' in localStorage) {
      this.coreDataService.templateData = JSON.parse(localStorage.getItem('templateData'));
    }
    window.onbeforeunload = (() => {
      localStorage.setItem('templateData', JSON.stringify(this.coreDataService.templateData));
    });
  }
  ngOnDestroy() {
    this.coreDataService.templateData.image = null;
    console.log(this.coreDataService.templateData);
    this.userService.addUpdateUserResumeData(firebase.auth().currentUser.uid);
  }
  openPaymentDialog(): void {
    let dialogRef = this.dialog.open(PaymentRequestComponent, {
      width: '350px',
      data: {amount: 1500}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exportHtmlTableDataToPdf('templateFile', this.coreDataService.templateData.title);
      }
    });
  }
  exportToPdf() {
    if (this.coreDataService.userDetails.role.toLowerCase() !== 'admin' || this.coreDataService.userDetails.role.toLowerCase() !== 'co-admin') {
      let dialogRef = this.dialog.open(DownloadWarningDialogComponent, {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.openPaymentDialog();
        } else {}
      });
    } else {
      this.exportRightNow();
    }
  }
  exportRightNow() {
    this.exportHtmlTableDataToPdf('templateFile', this.coreDataService.templateData.title);
  }
  exportHtmlTableDataToPdf(element, fileName: string) {
    let opt = {
      margin: 12,
      filename: fileName.replace(' ', '-') + '-resumearc.pdf',
      image: {type: 'jpg', quality: 0.99},
      html2canvas: {dpi: 192, letterRendering: true, useCORS: true},
      jsPDF: {unit: 'pt', format: 'letter', orientation: 'portrait', scale: 4
      }};
    html2pdf().from(document.getElementById(element)).set(opt).save();
    this.coreDataService.showSpinner = false;
    this.openFeedbackDialog();
  }
  openFeedbackDialog() {
    let dialogRef = this.dialog.open(FeedbackFormComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {}
    });
  }
  logoutUser() {
    this.auth.logout();
  }
  // @HostListener('window:beforeunload', ['$event'])
  // preventReload(event) {
  //     let confirmationMessage = "\o/";
  //     event.returnValue = confirmationMessage;    // Gecko, Trident, Chrome 34+
  //     return confirmationMessage;              // Gecko, WebKit, Chrome <34
  // }
  changeTheme(colorValue) {
    this.coreDataService.templateData.templateTheme = colorValue;
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
    this.coreDataService.templateData.companyInfo.push({companyName: 'Company name', workFromTo: 'From - To date/present', role: 'Your Designation', details: ['Your Achievement and responsiblities']});
  }
  deleteCompanyInfo(i) {
    this.coreDataService.templateData.companyInfo.splice(i, 1);
  }
  addAcheivement(i) {
    this.coreDataService.templateData.companyInfo[i].details.push('Your Achievement and responsiblities');
  }
  deleteAcheivement(i, j) {
    this.coreDataService.templateData.companyInfo[i].details.splice(j, 1);
  }
  addEducation() {
    this.coreDataService.templateData.educationInfo.push({schoolName: 'Institute Name', department: 'department', yearFromTo: 'From - To date/present', gpa: 'GPA percentage'});
  }
  deleteEduInfo(i) {
    this.coreDataService.templateData.educationInfo.splice(i, 1);
  }
  addCerficates() {
    this.coreDataService.templateData.certificates.push({certificateName: 'Certificate Name', year: 'Time'});
  }
  deleteCerficates(i) {
    this.coreDataService.templateData.certificates.splice(i, 1);
  }
  addAwards() {
    this.coreDataService.templateData.honorAwardInfo.push({year: 'Year', award:'Sample awards\'s'});
  }
  deleteAwards(i) {
    this.coreDataService.templateData.honorAwardInfo.splice(i, 1);
  }
  removeImage() {
    this.coreDataService.templateData.image = null;
  }
  addInterest() {
    this.coreDataService.templateData.interestOn.push('Add Interest');
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
    this.coreDataService.templateData.knownLanguage.push('New Language');
  }
  addTechSkills() {
    this.coreDataService.templateData.technicalSkills.push('New Skills');
  }
  addComputerSkills() {
    this.coreDataService.templateData.computerSkills.push('New Skills');
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
sanitizeVideoUrl(url) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}

