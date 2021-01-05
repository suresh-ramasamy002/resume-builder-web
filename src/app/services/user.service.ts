import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CoreDataService} from './core-data.service';
import {BehaviorSubject} from 'rxjs';
import {EnrollUserDetails} from '../class/api-model/request';
import {
  ActivitiesInfo,
  Certifications,
  CompanyInfo,
  EduInfo,
  FeedbackRes,
  ResumeDataRes,
  ResumeDownload,
  Skills,
  TemplateCoreObj
} from '../class';
import {HonorAwardsInfo} from '../class/honor-awards-info';
import {Feedback} from '../class/feedback';
import {CourseInfo} from '../class/course-info';
import {ProjectInfo} from '../class/project-info';
import {falseIfMissing} from 'protractor/built/util';
import {SummaryDetails} from '../class/summary-details';
import {ReferenceInfo} from '../class/reference-info';

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
        details: [{summary: '', margin: 0}],
        isPresent: false,
        startDate: null,
        endDate: null,
        endMonth: null,
        startMonth: null,
        margin: 0
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
        gpaStatus: null,
        margin: 0
      }];
      const honorAwardsData: Array<HonorAwardsInfo> = [{
        year: '',
        award: '',
        margin: 0,
      }];
      const languageKnownData: Array<Skills> = [{skill: '', rate: 0, margin: 0}];
      const computerSkillsData: Array<Skills> = [{skill: '', rate: 0, margin: 0}];
      const techSkillsData: Array<Skills> = [{skill: '', rate: 0, margin: 0}];
      const interestedData: Array<SummaryDetails> = [{summary: '', margin: 0}];
      const addnInfoData: Array<SummaryDetails> = [{summary: '', margin: 0}];
      const refernceData: Array<ReferenceInfo> = [{name: '', jobTitle: '', company: '',  margin: 0}];
      const certificateData: Array<Certifications> = [{certificateName: '', year: '', toDate: '', fromDate: '', margin: 0, description: ''}];
      const courseInfoData: Array<CourseInfo> = [new CourseInfo(null, null, [{summary: '', margin: 0}], true, null, null, null, null, 0)];
      const projectInfoData: Array<ProjectInfo> = [new ProjectInfo(null, [{summary: '', margin: 0}], 0)];
      const coActivities: Array<SummaryDetails> = [{summary: '', margin: 0}];
      const extraActivities: Array<SummaryDetails> = [{summary: '', margin: 0}];
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
        pageType: '59.36',
        linkedIn: null,
        gitHub: null,
        courseInfo: courseInfoData,
        projectInfo: projectInfoData,
        coActivitiesInfo: coActivities,
        extraActivitiesInfo: extraActivities,
        project: false,
        coActivities: false,
        extraActivities: false,
        course: false,
        certifications: false,
        honorReward: false,
        activities: false,
        reference: false,
        additionalInfo: false,
        interest: false,
        tech: false,
        language: false,
        spacingPersonalInfo: 0,
        spacingObjective: 0,
        spacingWorkExp: 0,
        spacingCourse: 0,
        spacingProject: 0,
        spacingEducation: 0,
        spacingSkills: 0,
        spacingSoftware: 0,
        spacingLanguage: 0,
        spacingInterest: 0,
        spacingCertificate: 0,
        spacingAwards: 0,
        spacingCoActivities: 0,
        spacingExtraActivities: 0,
        spacingAddInfoActivities: 0,
        spacingReference: 0,
        starType: 'round',
        fonts: {
          nameFontSize: 26,
          nameFontWeight: 'Bold',
          nameFontStyle: 'normal',
          nameTextTransform: 'normal',
          nameTextDecoration: 'normal',
          roleFontSize: 18,
          roleFontWeight: 'normal',
          roleFontStyle: 'normal',
          roleTextTransform: 'normal',
          roleTextDecoration: 'normal',
          sectionFontSize: 18,
          sectionFontWeight: 'Bold',
          sectionFontStyle: 'normal',
          sectionTextTransform: 'normal',
          sectionTextDecoration: 'normal',
          entryTitleFontSize: 17,
          entryTitleFontWeight: 'Bold',
          entryTitleFontStyle: 'normal',
          entryTitleTextTransform: 'normal',
          entryTitleTextDecoration: 'normal',
          entrySubtitleFontSize: 15,
          entrySubtitleFontWeight: 'normal',
          entrySubtitleFontStyle: 'normal',
          entrySubtitleTextTransform: 'normal',
          entrySubtitleTextDecoration: 'normal',
          entryTextFontSize: 14,
          entryTextFontWeight: 'normal',
          entryTextFontStyle: 'normal',
          entryTextTextTransform: 'normal',
          entryTextTextDecoration: 'normal',
        },
        spacing: {
          sectionSpacing: 1.2,
          entrySpacing: 1.2
        },
        showSkillsRate: true,
        showTechRate: true,
        showLanguageRate: true
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
