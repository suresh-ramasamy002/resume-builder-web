import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import * as firebase from 'firebase/app';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public coreDataService: CoreDataService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserData(firebase.auth().currentUser.uid);
  }

  logoutUser() {
    this.auth.logout();
  }
}
