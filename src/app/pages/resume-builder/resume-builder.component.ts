import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {CourseInfo} from '../../class/course-info';
import {ProjectInfo} from '../../class/project-info';
import {ConstantDataService} from '../../services/constant-data.service';
@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit, OnDestroy {
   public sectionName = null;
  private PDF_EXTENSION = '.pdf';
  @ViewChild('templateFile') template: ElementRef;
  public themeColor =  [];
  @ViewChild('sidenav') sidenav: MatSidenav;
  private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
  public fontFamily = ['Arial', 'Arimo', 'Helvetica', 'Noto Sans', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Work Sans'];
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
  // public noOfPages = [{number: '1', desc: 'onePage'}, {number: '2', desc: 'twoPage'}, {number: '3', desc: 'threePage'}, {number: '4', desc: 'fourPage'}, {number: '5', desc: 'fivePage'}, {number: '6', desc: 'sixPage'}, {number: '7', desc: 'sevenPage'}, {number: '8', desc: 'eightPage'}, {number: '9', desc: 'ninePage'}, {number: '10', desc: 'tenPage'}];
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
    {name: 'purple', value: '#542494'},
    {name: 'lightpurple', value: '#731c92'},
    {name: 'red', value: '#bf271f'},
    {name: 'darkred', value: '#7d1914'},
    {name: 'darkgray', value: '#453a54'}
  ];
  public noOfPages = [
    {page: '1', size: '29.68'},
    {page: '2', size: '59.36'},
    {page: '3', size: '89.04'},
    {page: '4', size: '118.72'},
    {page: '5', size: '148.40'},
    {page: '6', size: '178.08'},
    {page: '7', size: '207.76'},
    {page: '8', size: '237.44'},
    {page: '9', size: '267.12'},
    {page: '10', size: '296.8'}
  ];
  public reOrderDetails = false;
  public sectionSpacing = false;
  public starType = [{name: 'round', hexCode: '&#x25cf;', label: 'Round'}, {name: 'star', hexCode: '&#9733;', label: 'Star'}, {name: 'square', hexCode: '&#x25a0;', label: 'Square'}, {name: 'diamond', hexCode: '&#9830;', label: 'Diamond'}];
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private sanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog, public constantDataService: ConstantDataService) {

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
    if (this.coreDataService.selectedTemplate === 'template-six' || this.coreDataService.selectedTemplate === 'template-nine') {
      this.coreDataService.templateData.spacing.sectionSpacing = 0.5;
    } else {
      this.coreDataService.templateData.spacing.sectionSpacing = 1.2;
    }
    window.onbeforeunload = (() => {
      localStorage.setItem('templateData', JSON.stringify(this.coreDataService.templateData));
      localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
      localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    });
     this.constantDataService.refreshData();
    if ('selectedTemplateTheme' in localStorage) {
      this.coreDataService.templateData.templateTheme = localStorage.getItem('selectedTemplateTheme');
    }
  }
  ngOnDestroy() {
    this.coreDataService.templateData.image = null;
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    this.userService.addUpdateUserResumeData(firebase.auth().currentUser.uid);
  }
  setThemePerTemplate(templateName) {
    this.themeColor = [
      { name: 'Blue', value: '#353f58' },
      { name: 'Blue Grey', value: '#607D8B' },
      { name: 'Black', value: '#343b46' },
      {name: 'oliveGreen', value: '#01998d'},
      {name: 'tickBlue', value: '#003d74'}
    ];
    return this.themeColor;
  }
  setTickColor(colorVal) {
    let color = '#ffffff';
    switch(colorVal) {
      case '#d7d7d7' : color = '#363d49';
      break;
      case '#bbbcbf' : color = '#363d49';
        break;
    }
    return color;
  }
  openPaymentDialog(): void {
    if (this.coreDataService.userDetails.role === 'PRO_ADMIN_1' || this.coreDataService.userDetails.role === 'CO_ADMIN_1') {
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
        jsPDF: {unit: 'pt', format: 'a4', orientation: 'portrait'}
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
    if (templateName === 'template-six' || templateName === 'template-nine') {
      this.coreDataService.templateData.spacing.sectionSpacing = 0.5;
    } else {
      this.coreDataService.templateData.spacing.sectionSpacing = 1.2;
    }
    this.coreDataService.selectedTemplate = templateName;
    this.coreDataService.templateData.templateTheme = theme;
    this.setThemePerTemplate(this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', this.coreDataService.templateData.templateTheme);
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
    this.constantDataService.refreshData();
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
    this.coreDataService.templateData.companyInfo.push({companyName: '', workFromTo: '', role: '', details: [{summary: '', margin: 0}], isPresent: false, startDate: null, endDate: null, endMonth: null, startMonth: null, margin: 0});
  }
  deleteCompanyInfo(i) {
    this.workExpIndex = null;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.companyInfo.splice(i, 1);
      } else {
      }
    });
  }
  addAcheivement(i) {
    this.coreDataService.templateData.companyInfo[i].details.push({summary: '', margin: 0});
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
      gpaStatus: null, margin: 0});
  }
  deleteEduInfo(i) {
    this.educationIndex = null;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.educationInfo.splice(i, 1);
      } else {
      }
    });
  }
  addCerficates() {
    this.coreDataService.templateData.certificates.push({certificateName: '', year: '', toDate: '', fromDate: '', margin: 0, description: ''});
  }
  deleteCerficates(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.certificates.splice(i, 1);
      } else {
      }
    });
  }
  addAwards() {
    this.coreDataService.templateData.honorAwardInfo.push({year: '', award: '', margin: 0});
  }
  deleteAwards(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
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
    this.coreDataService.templateData.interestOn.push({summary: '', margin: 0});
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
    this.coreDataService.templateData.knownLanguage.push({skill: '', rate: 0, margin: 0});
  }
  addTechSkills() {
    this.coreDataService.templateData.technicalSkills.push({skill: '', rate: 0, margin: 0});
  }
  addComputerSkills() {
    this.coreDataService.templateData.computerSkills.push({skill: '', rate: 0, margin: 0});
  }
  addAdditionalInfo(){
    this.coreDataService.templateData.additionalInfoDetails.push({summary: '', margin: 0});
  }
  deleteAdditionalInfo(i){
    this.coreDataService.templateData.additionalInfoDetails.splice(i, 1);
  }
  addReference(){
    this.coreDataService.templateData.referenceDetails.push({name: '', jobTitle: '', company: '',  margin: 0});
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
        jsPDF: {unit: 'pt', format: 'a4', orientation: 'portrait'}
      };
      html2pdf().from(document.getElementById(selectedElement)).set(opt).toPdf().get('pdf').then((pdf) => {
        let dialogRef = this.dialog.open(PdfViewerComponent, {
          width: '80vw',
          maxWidth: '80vw',
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
    if(this.coreDataService.templateData.educationInfo[i].course != null && this.coreDataService.templateData.educationInfo[i].dept != null && this.coreDataService.templateData.educationInfo[i].course != '' && this.coreDataService.templateData.educationInfo[i].dept != '') {
      this.coreDataService.templateData.educationInfo[i].department = this.coreDataService.templateData.educationInfo[i].course + ', ' + this.coreDataService.templateData.educationInfo[i].dept;
    } else {
      this.coreDataService.templateData.educationInfo[i].department = '';
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
    if (this.coreDataService.templateData.certificates[i].fromDate != null && this.coreDataService.templateData.certificates[i].toDate != null) {
      this.coreDataService.templateData.certificates[i].year = this.coreDataService.templateData.certificates[i].toDate + ' ' + this.coreDataService.templateData.certificates[i].fromDate;
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
  setGpaFormat(i) {
    this.coreDataService.templateData.educationInfo[i].gpa = this.coreDataService.templateData.educationInfo[i].gpaStatus + '' + this.coreDataService.templateData.educationInfo[i].gpaFormat;
  }
  hideWorkExp() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.workExp = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideEduExp() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.education = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideSkills() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.skills = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideSummary() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.objective = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideSoftware() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.tech = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideLanguages() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.language = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideCertificates() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.certifications = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideHonors() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.honorReward = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideInterest() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.interest = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideActivities() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.activities = false;
        this.sectionName = 'Personal Info';
      } else {
      }
    });
  }
  hideAdditionalInfo() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.additionalInfo = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideReference() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.reference = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideCourse() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.course = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  deleteCourseDetail(i, j) {
    this.coreDataService.templateData.courseInfo[i].details.splice(j, 1);
  }
  addCourseDetail(i) {
    this.coreDataService.templateData.courseInfo[i].details.push({summary: '', margin: 0});
  }
  setCourseDateWithEnd(i) {
    if (this.coreDataService.templateData.courseInfo[i].endMonth != null && this.coreDataService.templateData.courseInfo[i].endDate != null) {
      this.coreDataService.templateData.courseInfo[i].courseFromTo = this.coreDataService.templateData.courseInfo[i].startMonth + ' ' + this.coreDataService.templateData.courseInfo[i].startDate + ' - ' + this.coreDataService.templateData.courseInfo[i].endMonth + ' ' + this.coreDataService.templateData.courseInfo[i].endDate;
    }
  }
  setCourseDate(checked, i) {
    this.coreDataService.templateData.courseInfo[i].isPresent = checked;
    if (checked) {
      this.coreDataService.templateData.courseInfo[i].endMonth = null;
      this.coreDataService.templateData.courseInfo[i].endDate = null;
      this.coreDataService.templateData.courseInfo[i].courseFromTo = this.coreDataService.templateData.courseInfo[i].startMonth + ' ' + this.coreDataService.templateData.courseInfo[i].startDate + ' - Present';
    } else {
      this.coreDataService.templateData.courseInfo[i].courseFromTo = this.coreDataService.templateData.courseInfo[i].startMonth + ' ' + this.coreDataService.templateData.courseInfo[i].startDate;
    }
}
  SwapCourseInfo(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.courseInfo, event.previousIndex, event.currentIndex);
  }
  deleteCourseInfo(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.courseInfo.splice(i ,1);
      } else {
      }
    });
  }
  addCourseInfo() {
    this.coreDataService.templateData.courseInfo.push(new CourseInfo(null, null, [{summary: '', margin: 0}], true, null, null, null, null, 0));
  }
  hideProject() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.project = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  addProject() {
    this.coreDataService.templateData.projectInfo.push(new ProjectInfo(null, [{summary: '', margin: 0}], 0));
  }
  deleteProjectInfo(i) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to remove this entry?', message: 'If you remove this position all your changes will be lost.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.projectInfo.splice(i ,1);
      } else {
      }
    });
  }
  deleteProjectDetail(i, j) {
    this.coreDataService.templateData.projectInfo[i].projectDesc.splice(j, 1);
  }
  addProjectDetail(i) {
    this.coreDataService.templateData.projectInfo[i].projectDesc.push({summary: '', margin: 0});
  }
  SwapProjectInfo(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.projectInfo, event.previousIndex, event.currentIndex);
  }
  hideCoActivities() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.coActivities = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  hideExtraActivities() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {heading: 'Do you want to hide this section?', message: 'Your changes have been saved. You can add this section once again later.'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coreDataService.templateData.extraActivities = false;
        this.sectionName = 'Personal Info';
        this.constantDataService.refreshData();
      } else {
      }
    });
  }
  addCoActivities() {
    this.coreDataService.templateData.coActivitiesInfo.push({summary: '', margin: 0});
  }
  deleteCoActivities(i) {
    this.coreDataService.templateData.coActivitiesInfo.splice(i, 1);
  }
  SwapCoActivities(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.coActivitiesInfo, event.previousIndex, event.currentIndex);
  }
  SwapExtraActivities(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.extraActivitiesInfo, event.previousIndex, event.currentIndex);
  }
  SwapAdditionalInfo(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.additionalInfoDetails, event.previousIndex, event.currentIndex);
  }
  SwapReference(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.coreDataService.templateData.referenceDetails, event.previousIndex, event.currentIndex);
  }
  addExtraActivities() {
    this.coreDataService.templateData.extraActivitiesInfo.push({summary: '', margin: 0});
  }
  deleteExtraActivities(i) {
    this.coreDataService.templateData.extraActivitiesInfo.splice(i, 1);
  }
  scrollToView(sectionId) {
    // document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
  }
  nameFontWeight() {
    if (this.coreDataService.templateData.fonts.nameFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.nameFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.nameFontWeight = 'Bold';
    }
  }
  nameFontStyle() {
    if (this.coreDataService.templateData.fonts.nameFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.nameFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.nameFontStyle = 'italic';
    }
  }
  nameFontDecoration() {
    if (this.coreDataService.templateData.fonts.nameTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.nameTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.nameTextDecoration = 'underline';
    }
  }
  nameFontTransform() {
    if (this.coreDataService.templateData.fonts.nameTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.nameTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.nameTextTransform = 'uppercase';
    }
  }


  roleFontWeight() {
    if (this.coreDataService.templateData.fonts.roleFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.roleFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.roleFontWeight = 'Bold';
    }
  }
  roleFontStyle() {
    if (this.coreDataService.templateData.fonts.roleFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.roleFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.roleFontStyle = 'italic';
    }
  }
  roleFontDecoration() {
    if (this.coreDataService.templateData.fonts.roleTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.roleTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.roleTextDecoration = 'underline';
    }
  }
  roleFontTransform() {
    if (this.coreDataService.templateData.fonts.roleTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.roleTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.roleTextTransform = 'uppercase';
    }
  }

  sectionFontWeight() {
    if (this.coreDataService.templateData.fonts.sectionFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.sectionFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.sectionFontWeight = 'Bold';
    }
  }
  sectionFontStyle() {
    if (this.coreDataService.templateData.fonts.sectionFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.sectionFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.sectionFontStyle = 'italic';
    }
  }
  sectionFontDecoration() {
    if (this.coreDataService.templateData.fonts.sectionTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.sectionTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.sectionTextDecoration = 'underline';
    }
  }
  sectionFontTransform() {
    if (this.coreDataService.templateData.fonts.sectionTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.sectionTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.sectionTextTransform = 'uppercase';
    }
  }


  entryTitleFontWeight() {
    if (this.coreDataService.templateData.fonts.entryTitleFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.entryTitleFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.entryTitleFontWeight = 'Bold';
    }
  }
  entryTitleFontStyle() {
    if (this.coreDataService.templateData.fonts.entryTitleFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.entryTitleFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.entryTitleFontStyle = 'italic';
    }
  }
  entryTitleFontDecoration() {
    if (this.coreDataService.templateData.fonts.entryTitleTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.entryTitleTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.entryTitleTextDecoration = 'underline';
    }
  }
  entryTitleFontTransform() {
    if (this.coreDataService.templateData.fonts.entryTitleTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.entryTitleTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.entryTitleTextTransform = 'uppercase';
    }
  }


  entrySubtitleFontWeight() {
    if (this.coreDataService.templateData.fonts.entrySubtitleFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.entrySubtitleFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.entrySubtitleFontWeight = 'Bold';
    }
  }
  entrySubtitleFontStyle() {
    if (this.coreDataService.templateData.fonts.entrySubtitleFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.entrySubtitleFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.entrySubtitleFontStyle = 'italic';
    }
  }
  entrySubtitleFontDecoration() {
    if (this.coreDataService.templateData.fonts.entrySubtitleTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.entrySubtitleTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.entrySubtitleTextDecoration = 'underline';
    }
  }
  entrySubtitleFontTransform() {
    if (this.coreDataService.templateData.fonts.entrySubtitleTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.entrySubtitleTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.entrySubtitleTextTransform = 'uppercase';
    }
  }


  entryTextFontWeight() {
    if (this.coreDataService.templateData.fonts.entryTextFontWeight === 'Bold') {
      this.coreDataService.templateData.fonts.entryTextFontWeight = 'normal';
    }else {
      this.coreDataService.templateData.fonts.entryTextFontWeight = 'Bold';
    }
  }
  entryTextFontStyle() {
    if (this.coreDataService.templateData.fonts.entryTextFontStyle === 'italic') {
      this.coreDataService.templateData.fonts.entryTextFontStyle = 'normal';
    } else {
      this.coreDataService.templateData.fonts.entryTextFontStyle = 'italic';
    }
  }
  entryTextDecoration() {
    if (this.coreDataService.templateData.fonts.entryTextTextDecoration == 'underline') {
      this.coreDataService.templateData.fonts.entryTextTextDecoration = 'none';
    } else {
      this.coreDataService.templateData.fonts.entryTextTextDecoration = 'underline';
    }
  }
  entryTextTransform() {
    if (this.coreDataService.templateData.fonts.entryTextTextTransform == 'uppercase') {
      this.coreDataService.templateData.fonts.entryTextTextTransform = 'none';
    } else {
      this.coreDataService.templateData.fonts.entryTextTextTransform = 'uppercase';
    }
  }
  swapCubicLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCubicLeft, event.previousIndex, event.currentIndex);
  }
  swapCubicRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCubicRight, event.previousIndex, event.currentIndex);
  }
  swapCascadeLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCascadeLeft, event.previousIndex, event.currentIndex);
  }
  swapCascadeRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCascadeRight, event.previousIndex, event.currentIndex);
  }
  swapEnfoldLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateEnfoldLeft, event.previousIndex, event.currentIndex);
  }
  swapEnfoldRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateEnfoldRight, event.previousIndex, event.currentIndex);
  }
  swapVibesLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateVibesLeft, event.previousIndex, event.currentIndex);
  }
  swapVibesRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateVibesRight, event.previousIndex, event.currentIndex);
  }
  swapCrispLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCrispLeft, event.previousIndex, event.currentIndex);
  }
  swapCrispRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateCrispRight, event.previousIndex, event.currentIndex);
  }
  swapMuseLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateMuseLeft, event.previousIndex, event.currentIndex);
  }
  swapMuseRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateMuseRight, event.previousIndex, event.currentIndex);
  }
  swapSimpleLeftSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateSimpleLeft, event.previousIndex, event.currentIndex);
  }
  swapSimpleRightSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateSimpleRight, event.previousIndex, event.currentIndex);
  }
  swapIconicSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateIconic, event.previousIndex, event.currentIndex);
  }
  swapNanicaSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateNanica, event.previousIndex, event.currentIndex);
  }
  swapInfluxSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.constantDataService.populateInflux, event.previousIndex, event.currentIndex);
  }
  logoutUser() {
    this.auth.logout();
  }
}
