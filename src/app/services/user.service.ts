import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CoreDataService} from './core-data.service';
import {BehaviorSubject} from 'rxjs';
import {EnrollUserDetails} from '../class/api-model/request';
import {ActivitiesInfo, Certifications, CompanyInfo, EduInfo, FeedbackRes, ResumeDataRes, ResumeDownload, TemplateCoreObj} from '../class';
import {HonorAwardsInfo} from '../class/honor-awards-info';
import {Feedback} from '../class/feedback';

@Injectable()
export class UserService {
  private evtAuthErr = new BehaviorSubject<string>('');
  evtAuthErr$ = this.evtAuthErr.asObservable();
  private authState: any = null;
  private storeTemplateData = new TemplateCoreObj({});
  constructor(private afu: AngularFireAuth, private db: AngularFirestore, private router: Router, private coreDataService: CoreDataService) {
    this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }
  addUpdateUserResumeData(uid) {
    return this.db.doc('/usersResumeData/' + uid).set({
     resume: this.coreDataService.templateData
    });
  }
  getUserResumeData(uid) {
    return this.db.doc('usersResumeData/' + uid).valueChanges().subscribe((res: ResumeDataRes) => {
      if(res != undefined && res.resume) {
        this.coreDataService.templateData = res.resume;
        localStorage.setItem('templateData', JSON.stringify(this.coreDataService.templateData));
      } else {
        setTimeout(() => {
          this.setCoreVariables();
        }, 100);
      }
    });
  }
  setCoreVariables() {
    if ('templateData' in localStorage) {
      this.coreDataService.templateData = JSON.parse(localStorage.getItem('templateData'));
    } else {
      const companyInfoData: Array<CompanyInfo> = [{
        workFromTo: '',
        companyName: '',
        role: '',
        details: [''],
        isPresent: false,
        startDate: null,
        endDate: null,
        endMonth: null,
        startMonth: null
      }];
      const eduInfoData: Array<EduInfo> = [{
        yearFromTo: '',
        schoolName: '',
        department: '',
        gpa: '',
        course: '',
        dept: '',
        startDate: null,
        endDate: null,
        endMonth: null,
        startMonth: null,
        isPresent: false,
        gpaFormat: '/10',
        gpaStatus: null
      }];
      const honorAwardsData: Array<HonorAwardsInfo> = [{
        year: '',
        award: ''
      }];
      const languageKnownData = [{skill: '', rate: 0}];
      const computerSkillsData = [{skill: '', rate: 0}];
      const techSkillsData = [{skill: '', rate: 0}];
      const interestedData = [''];
      const addnInfoData = [''];
      const refernceData = [''];
      const certificateData: Array<Certifications> = [{certificateName: '', year: '', toDate: '', fromDate: ''}];
      const activityInfoData: Array<ActivitiesInfo> = [new ActivitiesInfo({place: '', role: '', year: '', summary: ['']})];
      this.storeTemplateData = new TemplateCoreObj({
        image: null,
        isImageNeeded: true,
        title: '',
        titleSize: 22,
        role: '',
        roleSize: 17,
        normalSize: 16,
        dob: '',
        gender: '',
        templateTheme: '#292929',
        fontFamily: 'Arial',
        fontSize: 2,
        phone: '',
        email: '',
        address: '',
        objectiveMsg: '',
        companyInfo: companyInfoData,
        educationInfo: eduInfoData,
        certificates: certificateData,
        honorAwardInfo: honorAwardsData,
        knownLanguage: languageKnownData,
        computerSkills: computerSkillsData,
        technicalSkills: techSkillsData,
        interestOn: interestedData,
        additionalInfoDetails: addnInfoData,
        referenceDetails: refernceData,
        activitiesInfo: activityInfoData,
        pageType: 'multi',
        tech: true,
        language: true,
        linkedIn: null,
        gitHub: null
      });
      localStorage.setItem('templateData', JSON.stringify(this.storeTemplateData));
    }
  }
  setFeedBack(uid) {
    return this.db.doc('/feedbacks/' + uid).set({
      userFeedback: this.coreDataService.feedbacks
    });
  }
  getFeedbacks(uid) {
    return this.db.doc('feedbacks/' + uid).valueChanges().subscribe((res: FeedbackRes) => {
      this.coreDataService.feedbacks = res.userFeedback;
    });
  }
  getResumeDetails(uid) {
    return this.db.doc('resumeDownloadCount/' + uid).valueChanges().subscribe((res: ResumeDownload) => {
      this.coreDataService.resumeDownloadedData = res.resumeDownloaded;
    });
  }
  setResumeDetails(uid) {
    return this.db.doc('/resumeDownloadCount/' + uid).set({
      resumeDownloaded: this.coreDataService.resumeDownloadedData
    });
  }
  sendPaymentDetails(uid, userPayments) {
    return this.db.doc('/resumePayments/' + uid).set({
      payments: userPayments
    });
  }
}
