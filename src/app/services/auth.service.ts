import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {EnrollUserDetails} from '../class/api-model/request';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {CoreDataService} from './core-data.service';
import {AdminUserData} from '../class/api-model/response';
import set = Reflect.set;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: any = null;
  private newUser: EnrollUserDetails = null;
  private evtAuthErr = new BehaviorSubject<string>('');
  private userDataId = 'o995EnHR9ukYfLlnRw79';
  private userDataArray = [];
  evtAuthErr$ = this.evtAuthErr.asObservable();

  constructor(private afu: AngularFireAuth, private db: AngularFirestore, private router: Router, private coreDataService: CoreDataService) {
    this.afu.authState.subscribe((auth => {
         this.authState = auth;
    }));
  }
  createNewUser(userDetails: EnrollUserDetails) {
    this.coreDataService.showSpinner = true;
    this.getAdminUserDetails();
    this.afu.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(userCredential => {
          // userCredential.user.sendEmailVerification();
           this.newUser = userDetails;
           userCredential.user.updateProfile({
             displayName: userDetails.firstName
           });
           this.insertUserData(userCredential.user)
             .then(() => {
               this.coreDataService.showSpinner = false;
               this.router.navigate(['/home']);
               this.getAndSetUserData(userCredential.user);
             });
      })
    .catch(error => {
       this.coreDataService.showSpinner = false;
       this.evtAuthErr.next(error);
    });
  }

  insertUserData(user: firebase.User) {
    return this.db.doc('/users/' + user.uid).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: this.newUser.role
    });
  }
  loginUser(userDetails: EnrollUserDetails): void {
    this.coreDataService.showSpinner = true;
      this.afu.signInWithEmailAndPassword(userDetails.email, userDetails.password).then(user => {
        if (user) {
          this.coreDataService.showSpinner = false;
          this.router.navigate(['/home']);
        }
      }).catch(error => {
        this.coreDataService.showSpinner = false;
        this.evtAuthErr.next(error);
      });
  }
  getAndSetUserData(user: firebase.User) {
    this.userDataArray.push({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName
    });
    return this.db.doc('/accessUserDetails/' + this.userDataId).set({
      userData: this.userDataArray
    });
  }
  getAdminUserDetails() {
    this.db.collection('accessUserDetails').doc(this.userDataId).valueChanges().subscribe((res: AdminUserData) => {
      this.userDataArray = res.userData;
      this.coreDataService.userDetailsArr = res.userData;
    });
  }
  getUserData(uid) {
    this.db.collection('users').doc(uid).valueChanges().subscribe((res: EnrollUserDetails) => {
      const userData: EnrollUserDetails = new EnrollUserDetails(res.firstName, res.lastName, res.email, res.password, res.role);
      this.coreDataService.userDetails = userData;
      this.coreDataService.showSpinner = false;
      localStorage.setItem('userDetails', JSON.stringify(this.coreDataService.userDetails));
    });
  }
  logout() {
    this.afu.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  forgotPassword(email) {
    this.coreDataService.showSpinner = true;
    this.coreDataService.loadingMsg = 'Sending reset password link to email...';
    this.afu.sendPasswordResetEmail(email).then(() => {
      this.coreDataService.showSpinner = false;
      this.coreDataService.loadingMsg = null;
      this.router.navigate(['/login']);
    }).catch(error => {
      this.coreDataService.showSpinner = false;
      this.evtAuthErr.next(error);
    });
  }
}

