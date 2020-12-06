import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import * as firebase from 'firebase/app';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import set = Reflect.set;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
  public scrollNum = 0;
  @ViewChild('resumeSection') resumeSection: ElementRef;
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.coreDataService.showSpinner = false;
    }, 100);
    this.auth.getUserData(firebase.auth().currentUser.uid);
    this.userService.getUserResumeData(firebase.auth().currentUser.uid);
    this.userService.getResumeDetails(this.aId);
  }

  logoutUser() {
    this.auth.logout();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollNum = window.pageYOffset || 0;
  }
  selectedTemplate(templateName, theme) {
    this.coreDataService.selectedTemplate = templateName;
    // this.coreDataService.templateData.templateTheme = theme;
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', theme);
    this.router.navigate(['/tempEditor']);
}
  goToResumeTemplates() {
    this.resumeSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
}
