import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
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
        workFromTo: 'May 2019 - Jun 2020',
        companyName: 'Microsoft',
        role: 'Software Engineer',
        details: ['Building a working productivity app for real-time project management collaboration. App was downloaded 1234 times.', 'Wrote a native Java cryptocurrency tracking app. The app retrieves and displays current prices for the 10 most popular cryptocurrencies.']
      }];
      const eduInfoData: Array<EduInfo> = [{
        yearFromTo: 'May 2014 - Jun 2018',
        schoolName: 'Foreign trade university',
        department: 'Computer Science',
        gpa: '7.8/10'
      }];
      const honorAwardsData: Array<HonorAwardsInfo> = [{
        year: '2015',
        award: 'Sample award\'s title'
      }];
      const languageKnownData = ['English', 'Hindi'];
      const computerSkillsData = ['Microsoft word', 'Excel', 'Powerpoint'];
      const techSkillsData = ['Java', 'C++', 'Python'];
      const interestedData = ['Playing Cricket', 'Listening Music'];
      const addnInfoData = ['Sample Additional Info'];
      const refernceData = ['Reference\'s content'];
      const certificateData: Array<Certifications> = [{certificateName: 'The 2nd Prize of Science Research at University', year: '2014-2015'}];
      const activityInfoData: Array<ActivitiesInfo> = [new ActivitiesInfo({place: 'India', role: 'Volunteering', year: 'March 2014 - April 2019', summary: ['Involved in social activities like to teach culture for the childrens etc.,']})];
      this.storeTemplateData = new TemplateCoreObj({
        image: null,
        isImageNeeded: true,
        title: 'John Doe',
        titleSize: 20,
        role: 'Software Engineer',
        roleSize: 16,
        normalSize: 14,
        dob: 'September 1, 1996',
        gender: 'Male',
        templateTheme: null,
        fontFamily: 'Verdana',
        fontSize: 2,
        phone: '1234567890',
        email: 'johndoe@gmail.com',
        address: '6221 southfrontroad, CA, USA',
        objectiveMsg: 'Dedicated web developer with five years of experience in database administration and website design. Strong creative and analytical skills. Team player with an eye for detail. MySQL, Python and Ruby on Rails.',
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
        activitiesInfo: activityInfoData
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
    console.log(firebase.auth().currentUser.uid);
    return this.db.doc('feedbacks/' + uid).valueChanges().subscribe((res: FeedbackRes) => {
      this.coreDataService.feedbacks = res.userFeedback;
    });
  }
}
