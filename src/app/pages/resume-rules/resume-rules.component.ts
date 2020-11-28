import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as firebase from 'firebase/app';
import {CoreDataService} from '../../services/core-data.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resume-rules',
  templateUrl: './resume-rules.component.html',
  styleUrls: ['./resume-rules.component.scss']
})
export class ResumeRulesComponent implements OnInit {
  @ViewChild('resumeTips') resumeTips: ElementRef;
  public scrollNum = 0;
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.auth.getUserData(firebase.auth().currentUser.uid);
    this.userService.getUserResumeData(firebase.auth().currentUser.uid);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollNum = window.pageYOffset || 0;
  }
  logoutUser() {
    this.auth.logout();
  }
  goToResumeTips() {
    this.resumeTips.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
}
