import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CoreDataService} from './core-data.service';
import {BehaviorSubject} from 'rxjs';
import {EnrollUserDetails} from '../class/api-model/request';
import {ActivitiesInfo, Certifications, CompanyInfo, EduInfo, FeedbackRes, ResumeDataRes, TemplateCoreObj} from '../class';
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
        workFromTo: 'From - To/Present(eg:- JUN 2020 - OCT 2020)',
        companyName: 'Company Name',
        role: 'Your Designation',
        details: ['Achievement']
      }];
      const eduInfoData: Array<EduInfo> = [{
        yearFromTo: 'From - To/Present',
        schoolName: 'Institute',
        department: 'Department',
        gpa: 'gpa/10'
      }];
      const honorAwardsData: Array<HonorAwardsInfo> = [{
        year: 'year',
        award: 'Award details'
      }];
      const languageKnownData = [{skill: 'Known Language', rate: 0}];
      const computerSkillsData = [{skill: 'Software skills', rate: 0}];
      const techSkillsData = [{skill: 'Tech or management skills', rate: 0}];
      const interestedData = ['Your Interests'];
      const addnInfoData = ['Additional Info'];
      const refernceData = ['Reference\'s content'];
      const certificateData: Array<Certifications> = [{certificateName: 'Certification of ?', year: 'year(eg:- 2019 - 2020)'}];
      const activityInfoData: Array<ActivitiesInfo> = [new ActivitiesInfo({place: 'Place', role: 'Your Role', year: 'year(eg:- 2019 - 2020)', summary: ['Brief Description']})];
      this.storeTemplateData = new TemplateCoreObj({
        image: null,
        isImageNeeded: true,
        title: 'Your Name',
        titleSize: 20,
        role: 'Designation',
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
        objectiveMsg: 'A brief objective about you',
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
}
