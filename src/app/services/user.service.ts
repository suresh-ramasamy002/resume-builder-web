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
        workFromTo: 'From - To/Present',
        companyName: 'NAME OF YOUR COMPANY',
        role: 'Job position',
        details: ['Job\'s experience detail']
      }];
      const eduInfoData: Array<EduInfo> = [{
        yearFromTo: 'From - To/Present',
        schoolName: 'FULL NAME OF UNIVERSITY/ORGANIZATION',
        department: 'Your major/Name of your course',
        gpa: 'GPA, some subject'
      }];
      const honorAwardsData: Array<HonorAwardsInfo> = [{
        year: 'year',
        award: 'Sample award\'s title'
      }];
      const languageKnownData = [{skill: 'Skill 1', rate: 0}];
      const computerSkillsData = [{skill: 'Skill 1', rate: 0}];
      const techSkillsData = [{skill: 'Skill 1', rate: 0}];
      const interestedData = ['Interest 1'];
      const addnInfoData = ['Sample additional info'];
      const refernceData = ['Reference\'s content'];
      const certificateData: Array<Certifications> = [{certificateName: 'Sample certification\'s title', year: 'year'}];
      const activityInfoData: Array<ActivitiesInfo> = [new ActivitiesInfo({place: 'ACTIVITY ORGANIZATION', role: 'Sample position', year: 'year', summary: ['Sample activities description']})];
      this.storeTemplateData = new TemplateCoreObj({
        image: null,
        isImageNeeded: true,
        title: 'Full Name',
        titleSize: 20,
        role: 'Job\'s Title',
        roleSize: 16,
        normalSize: 14,
        dob: 'DOB',
        gender: 'Gender',
        templateTheme: '#292929',
        fontFamily: 'Verdana',
        fontSize: 2,
        phone: 'Your Phone',
        email: 'Your Email',
        address: 'Your Address',
        objectiveMsg: 'Fill in your Career’s Objective',
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
        pageType: 'single'
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
}
