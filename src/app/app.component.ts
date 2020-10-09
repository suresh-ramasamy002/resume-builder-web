import { Component, OnInit } from '@angular/core';
import {CoreDataService} from './services/core-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'resume-builder-web';
  constructor(public coreDataService: CoreDataService) {
  }
  ngOnInit() {

  }
}
