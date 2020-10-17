import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import * as firebase from 'firebase/app';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserData(firebase.auth().currentUser.uid);
    this.userService.getUserResumeData(firebase.auth().currentUser.uid);
  }

  logoutUser() {
    this.auth.logout();
  }
  selectedTemplate(templateName, theme) {
    this.coreDataService.selectedTemplate = templateName;
    this.coreDataService.templateData.templateTheme = theme;
    localStorage.setItem('selectedTemplate', this.coreDataService.selectedTemplate);
    localStorage.setItem('selectedTemplateTheme', theme);
    this.router.navigate(['/tempEditor']);
}

}
