import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../../services/auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import * as firebase from 'firebase/app';
import {DownloadWarningDialogComponent} from '../../components/download-warning-dialog/download-warning-dialog.component';
import {FeedbackFormComponent} from '../../components/feedback-form/feedback-form.component';
import {PdfViewerComponent} from '../../components/pdf-viewer/pdf-viewer.component';
declare let Razorpay: any;
import html2pdf from 'html2pdf.js';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {CdkDragDrop, moveItemInArray, CdkDragStart} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {
   public sectionName = null;
  private PDF_EXTENSION = '.pdf';
  @ViewChild('templateFile') template: ElementRef;
  public themeColor =  [];
  @ViewChild('sidenav') sidenav: MatSidenav;
  private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
  public fontFamily = ['Arial', 'Book Antiqua', 'Calibri', 'Cambria', 'Didot', 'Garamond', 'Georgia', 'Helvetica', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
  public options = {
    key: 'rzp_live_0Tyq3jzKCHpjDf',
    amount: '1500',
    currency: 'INR',
    name: 'Resumearc',
    description: 'One Time Transaction',
    image: 'assets/images/payment-logo.png',
    handler: ((response) => {
      this.saveToDB(response);
    }),
    theme: {
      color: '#34457F'
    }
  };
  public workExpIndex = 0;
  public educationIndex = 0;
  private rzp1 = new Razorpay(this.options);
  public monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public year = [];
  public enableWorkExpDrag = false;
  public certifiIndex = 0;
  public activityIndex = 0;
  public otherColors = [
    {name: 'lightgray', value: '#d7d7d7'},
    {name: 'semigray', value: '#bbbcbf'},
    {name: 'gray', value: '#8c9096'},
    {name: 'darkgray', value: '#454c57'},
    {name: 'black', value: '#000000'},
    {name: 'lightgreen', value: '#9dd82a'},
    {name: 'semigreen', value: '#339120'},
    {name: 'green', value: '#025923'},
    {name: 'navyGreen', value: '#007c73'}
  ];
  public otherColors1 = [
    {name: 'darkgreen', value: '#00494d'},
    {name: 'lightskyblue', value: '#04b4ff'},
    {name: 'skyblue', value: '#009bdf'},
    {name: 'semiblue', value: '#0075a7'},
    {name: 'blue', value: '#003d74'},
    {name: 'purple', value: '#542494'},
    {name: 'lightpurple', value: '#731c92'},
    {name: 'red', value: '#bf271f'},
    {name: 'darkred', value: '#7d1914'}
  ];
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private sanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.sectionName = 'Personal Info';
    this.year = [];
    for (let i = 2025; i >= 1900; i--) {
      this.year.push(i + '');
    }
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
      case 'template-nine': this.themeColor = [
        { name: 'Blue', value: '#414141' },
        { name: 'Blue Grey', value: '#353f58' },
        { name: 'Black', value: '#343b46'}];
        break;
      case 'template-ten': this.themeColor = [
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
      let razorpay = new Razorpay(this.options);
      razorpay.open();
      // let dialogRef = this.dialog.open(PaymentRequestComponent, {
      //   disableClose: true,
      //   width: '420px',
      //   data: {amount: 1500}
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     this.exportHtmlTableDataToPdf(this.coreDataService.selectedTemplate, this.coreDataService.templateData.title);
      //   }
      // });
    }
  }
  exportToPdf() {
    let dialogRef = this.dialog.open(DownloadWarningDialogComponent, {
      width: '400px'
    });
    this.coreDataService.hideSeparater = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openPaymentDialog();
      } else {
        this.coreDataService.hideSeparater = false;
      }
    });
  }
  exportRightNow() {
    this.coreDataService.showSpinner = true;
    this.exportHtmlTableDataToPdf(this.coreDataService.selectedTemplate, this.coreDataService.templateData.title);
  }
  exportHtmlTableDataToPdf(element, fileName: string) {
    this.coreDataService.hideSeparater = true;
    setTimeout(() => {
      let opt = {
        margin: 0,
        padding: 0,
        filename: fileName.replace(' ', '-') + '-resumearc.pdf',
        image: {type: 'jpeg', quality: 1},
        html2canvas: {dpi: 192, scale: 4, letterRendering: true, useCors: true},
        jsPDF: {unit: 'pt', format: 'letter', orientation: 'portrait'}
      };
      html2pdf().from(document.getElementById(element)).set(opt).save().then((e) => {
        this.coreDataService.resumeDownloadedData.forEach(resumeData => {
          if (resumeData.name === element && this.coreDataService.userDetails.role !== 'PRO_ADMIN_1' && this.coreDataService.userDetails.role !== 'CO_ADMIN_1') {
            resumeData.count++;
          }
        });
        this.userService.setResumeDetails(this.aId);
        this.coreDataService.showSpinner = false;
        this.coreDataService.hideSeparater = false;
        if (this.coreDataService.userDetails.role !== 'PRO_ADMIN_1') {
          this.openFeedbackDialog();
        }
      });
    }, 100);
  }
  openFeedbackDialog() {
    let amt = (this.coreDataService.selectedTemplate !== 'template-one' && this.coreDataService.selectedTemplate !== 'template-two' && this.coreDataService.selectedTemplate !== 'template-four') ? 15 : 0;
    let dialogRef = this.dialog.open(FeedbackFormComponent, {
      disableClose: true,
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
    if (this.coreDataService.templateData.fontFamily == 'Didot'){
      switch(size) {
        case '1':
          this.coreDataService.templateData.titleSize = 20;
          this.coreDataService.templateData.roleSize = 16;
          this.coreDataService.templateData.normalSize = 14;
          break;
        case '2':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 17;
          this.coreDataService.templateData.normalSize = 16;
          break;
        case '3':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 18;
          this.coreDataService.templateData.normalSize = 17;
          break;
      }
    }  else if (this.coreDataService.templateData.fontFamily == 'Arial'){
      switch(size) {
        case '1':
          this.coreDataService.templateData.titleSize = 20;
          this.coreDataService.templateData.roleSize = 17;
          this.coreDataService.templateData.normalSize = 15;
          break;
        case '2':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 17;
          this.coreDataService.templateData.normalSize = 16;
          break;
        case '3':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 18;
          this.coreDataService.templateData.normalSize = 17;
          break;
      }
    } else if (this.coreDataService.templateData.fontFamily == 'Verdana') {
      switch(size) {
        case '1':
          this.coreDataService.templateData.titleSize = 18;
          this.coreDataService.templateData.roleSize = 14;
          this.coreDataService.templateData.normalSize = 13;
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
    } else {
      switch(size) {
        case '1':
          this.coreDataService.templateData.titleSize = 20;
          this.coreDataService.templateData.roleSize = 17;
          this.coreDataService.templateData.normalSize = 16;
          break;
        case '2':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 18;
          this.coreDataService.templateData.normalSize = 17;
          break;
        case '3':
          this.coreDataService.templateData.titleSize = 22;
          this.coreDataService.templateData.roleSize = 19;
          this.coreDataService.templateData.normalSize = 18;
          break;
      }
    }
  }

  addWorkExperience() {
    this.coreDataService.templateData.companyInfo.push({companyName: '', workFromTo: '', role: '', details: [''], isPresent: false, startDate: null, endDate: null, endMonth: null, startMonth: null});
  }
  deleteCompanyInfo(i) {
    this.workExpIndex = null;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {message: 'Are you sure do you want to delete work experience?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.companyInfo.splice(i, 1);
      } else {
      }
    });
  }
  addAcheivement(i) {
    this.coreDataService.templateData.companyInfo[i].details.push('');
  }
  deleteAcheivement(i, j) {
    this.coreDataService.templateData.companyInfo[i].details.splice(j, 1);
  }
  addEducation() {
    this.coreDataService.templateData.educationInfo.push({schoolName: '', department: '', yearFromTo: '', gpa: '', course: '',
      dept: '',
      startDate: null,
      endDate: null,
      endMonth: null,
      startMonth: null, isPresent: false,  gpaFormat: '/10',
      gpaStatus: null});
  }
  deleteEduInfo(i) {
    this.educationIndex = null;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {message: 'Are you sure do you want to delete education?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.educationInfo.splice(i, 1);
      } else {
      }
    });
  }
  addCerficates() {
    this.coreDataService.templateData.certificates.push({certificateName: '', year: '', toDate: '', fromDate: ''});
  }
  deleteCerficates(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {message: 'Are you sure do you want to delete certificate?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.certificates.splice(i, 1);
      } else {
      }
    });
  }
  addAwards() {
    this.coreDataService.templateData.honorAwardInfo.push({year: '', award: ''});
  }
  deleteAwards(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {message: 'Are you sure do you want to delete Award?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.honorAwardInfo.splice(i, 1);
      } else {
      }
    });
  }
  removeImage() {
    this.coreDataService.templateData.image = null;
  }
  addInterest() {
    this.coreDataService.templateData.interestOn.push('');
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
    this.coreDataService.templateData.knownLanguage.push({skill: '', rate: 0});
  }
  addTechSkills() {
    this.coreDataService.templateData.technicalSkills.push({skill: '', rate: 0});
  }
  addComputerSkills() {
    this.coreDataService.templateData.computerSkills.push({skill: '', rate: 0});
  }
  addActivities() {
    this.coreDataService.templateData.activitiesInfo.push({place: '', role: '', year: '', summary: [''], isPresent: false,
      startDate: null,
      endDate: null,
      endMonth: null,
      startMonth: null});
  }
  deleteActivityInfo(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {message: 'Are you sure do you want to delete activity?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.activitiesInfo.splice(i, 1);
      } else {
      }
    });
  }
  deleteActivitySummary(i, k) {
    this.coreDataService.templateData.activitiesInfo[i].summary.splice(k, 1);
  }
  addActivitySummary(i) {
    this.coreDataService.templateData.activitiesInfo[i].summary.push('');
  }
  addAdditionalInfo(){
    this.coreDataService.templateData.additionalInfoDetails.push('');
  }
  deleteAdditionalInfo(i){
    this.coreDataService.templateData.additionalInfoDetails.splice(i, 1);
  }
  addReference(){
    this.coreDataService.templateData.referenceDetails.push('');
  }
  deleteReference(i){
    this.coreDataService.templateData.referenceDetails.splice(i, 1);
  }
  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  verifyPdfFile(selectedElement) {
    this.coreDataService.hideSeparater = true;
    this.coreDataService.showSpinner = true;
    setTimeout(() => {
      let opt = {
        margin: 0,
        image: {type: 'jpeg', quality: 1},
        html2canvas: {dpi: 192, scale: 4, letterRendering: true, useCors: true},
        jsPDF: {unit: 'pt', format: 'letter', orientation: 'portrait'}
      };
      html2pdf().from(document.getElementById(selectedElement)).set(opt).toPdf().get('pdf').then((pdf) => {
        let dialogRef = this.dialog.open(PdfViewerComponent, {
          width: '96vw',
          maxWidth: '96vw',
          data: {src: pdf.output('bloburl')}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.coreDataService.hideSeparater = false;
          } else {
            this.coreDataService.hideSeparater = false;
          }
        });
      });
    }, 100);
  }
  saveToDB(response) {
    console.log(response);
    let userPaymentsData = {
      name: this.coreDataService.userDetails.firstName,
      email: this.coreDataService.userDetails.email,
      amount: 15,
      paymentData: response
    };
    this.userService.sendPaymentDetails(firebase.auth().currentUser.uid, userPaymentsData);
    this.coreDataService.showSpinner = true;
    this.exportHtmlTableDataToPdf(this.coreDataService.selectedTemplate, this.coreDataService.templateData.title);
  }
  setWorkHistoryDate(checked, i) {
    this.coreDataService.templateData.companyInfo[i].isPresent = checked;
    if (checked) {
      this.coreDataService.templateData.companyInfo[i].endMonth = null;
      this.coreDataService.templateData.companyInfo[i].endDate = null;
      this.coreDataService.templateData.companyInfo[i].workFromTo = this.coreDataService.templateData.companyInfo[i].startMonth + ' ' + this.coreDataService.templateData.companyInfo[i].startDate + ' - Present';
    } else {
      this.coreDataService.templateData.companyInfo[i].workFromTo = this.coreDataService.templateData.companyInfo[i].startMonth + ' ' + this.coreDataService.templateData.companyInfo[i].startDate;
    }
  }
  setWorkHistoryDateWithEnd(i) {
    if (this.coreDataService.templateData.companyInfo[i].endMonth != null && this.coreDataService.templateData.companyInfo[i].endDate != null) {
      this.coreDataService.templateData.companyInfo[i].workFromTo = this.coreDataService.templateData.companyInfo[i].startMonth + ' ' + this.coreDataService.templateData.companyInfo[i].startDate + ' - ' + this.coreDataService.templateData.companyInfo[i].endMonth + ' ' + this.coreDataService.templateData.companyInfo[i].endDate;
    }
  }
  SwapWorkExp(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.companyInfo, event.previousIndex, event.currentIndex);
    this.workExpIndex = null;
  }
  SwapEducation(event) {
    moveItemInArray(this.coreDataService.templateData.educationInfo, event.previousIndex, event.currentIndex);
    this.educationIndex = null;
  }
  SwapWorkExpSummary(i, event) {
    moveItemInArray(this.coreDataService.templateData.companyInfo[i].details, event.previousIndex, event.currentIndex);
  }
  setEduDegree(i) {
    if(this.coreDataService.templateData.educationInfo[i].course != null && this.coreDataService.templateData.educationInfo[i].dept != null) {
      this.coreDataService.templateData.educationInfo[i].department = this.coreDataService.templateData.educationInfo[i].course + ', ' + this.coreDataService.templateData.educationInfo[i].dept;
    }
  }
  setEducationDate(checked, i) {
    this.coreDataService.templateData.educationInfo[i].isPresent = checked;
    if (checked) {
      this.coreDataService.templateData.educationInfo[i].endMonth = null;
      this.coreDataService.templateData.educationInfo[i].endDate = null;
      this.coreDataService.templateData.educationInfo[i].yearFromTo = this.coreDataService.templateData.educationInfo[i].startMonth + ' ' + this.coreDataService.templateData.educationInfo[i].startDate + ' - Present';
    } else {
      this.coreDataService.templateData.educationInfo[i].yearFromTo = this.coreDataService.templateData.educationInfo[i].startMonth + ' ' + this.coreDataService.templateData.educationInfo[i].startDate;
    }
  }
  setEducationDateWithEnd(i) {
    if (this.coreDataService.templateData.educationInfo[i].endMonth != null && this.coreDataService.templateData.educationInfo[i].endDate != null) {
      this.coreDataService.templateData.educationInfo[i].yearFromTo = this.coreDataService.templateData.educationInfo[i].startMonth + ' ' + this.coreDataService.templateData.educationInfo[i].startDate + ' - ' + this.coreDataService.templateData.educationInfo[i].endMonth + ' ' + this.coreDataService.templateData.educationInfo[i].endDate;
    }
  }
  SwapSkills(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.technicalSkills, event.previousIndex, event.currentIndex);
  }
  SwapComputerSkills(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.computerSkills, event.previousIndex, event.currentIndex);
  }
  SwapLangSkills(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.knownLanguage, event.previousIndex, event.currentIndex);
  }
  SwapCertificates(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.certificates, event.previousIndex, event.currentIndex);
  }
  setCertificateDate(i) {
    if (this.coreDataService.templateData.certificates[i].fromDate != null && this.coreDataService.templateData.certificates[i].toDate == null) {
      this.coreDataService.templateData.certificates[i].year = this.coreDataService.templateData.certificates[i].fromDate;
    } else if (this.coreDataService.templateData.certificates[i].fromDate == null && this.coreDataService.templateData.certificates[i].toDate != null) {
      this.coreDataService.templateData.certificates[i].year = this.coreDataService.templateData.certificates[i].toDate;
    } else if (this.coreDataService.templateData.certificates[i].fromDate != null && this.coreDataService.templateData.certificates[i].toDate != null) {
      this.coreDataService.templateData.certificates[i].year = this.coreDataService.templateData.certificates[i].fromDate + ' - ' + this.coreDataService.templateData.certificates[i].toDate;
    } else {
      this.coreDataService.templateData.certificates[i].year = null;
    }
  }
  SwapHonors(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.honorAwardInfo, event.previousIndex, event.currentIndex);
  }
  SwapInterest(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.interestOn, event.previousIndex, event.currentIndex);
  }
  setActivityDate(checked, i) {
    this.coreDataService.templateData.activitiesInfo[i].isPresent = checked;
    if (checked) {
      this.coreDataService.templateData.activitiesInfo[i].endMonth = null;
      this.coreDataService.templateData.activitiesInfo[i].endDate = null;
      this.coreDataService.templateData.activitiesInfo[i].year = this.coreDataService.templateData.activitiesInfo[i].startMonth + ' ' + this.coreDataService.templateData.activitiesInfo[i].startDate + ' - Present';
    } else {
      this.coreDataService.templateData.activitiesInfo[i].year = this.coreDataService.templateData.activitiesInfo[i].startMonth + ' ' + this.coreDataService.templateData.activitiesInfo[i].startDate;
    }
  }
  setActivityDateWithEnd(i) {
    if (this.coreDataService.templateData.activitiesInfo[i].endMonth != null && this.coreDataService.templateData.activitiesInfo[i].endDate != null) {
      this.coreDataService.templateData.activitiesInfo[i].year = this.coreDataService.templateData.activitiesInfo[i].startMonth + ' ' + this.coreDataService.templateData.activitiesInfo[i].startDate + ' - ' + this.coreDataService.templateData.activitiesInfo[i].endMonth + ' ' + this.coreDataService.templateData.activitiesInfo[i].endDate;
    }
  }
  SwapActivities(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.activitiesInfo, event.previousIndex, event.currentIndex);
  }
  setGpaFormat(i) {
    this.coreDataService.templateData.educationInfo[i].gpa = this.coreDataService.templateData.educationInfo[i].gpaStatus + '' + this.coreDataService.templateData.educationInfo[i].gpaFormat;
  }
}
