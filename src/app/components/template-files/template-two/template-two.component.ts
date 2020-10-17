import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit {

  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }
  setTextColor(bgColor) {
    let color = '#292929';
    switch (bgColor) {
      case '#292929': color = '#FFFFFF';
      break;
      case '#353f58': color = '#FFFFFF';
      break;
    }
    return color;
  }
}
