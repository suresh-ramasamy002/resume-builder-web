import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-three',
  templateUrl: './template-three.component.html',
  styleUrls: ['./template-three.component.scss']
})
export class TemplateThreeComponent implements OnInit {

  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }
  setTextColor(bgColor) {
    let color = '#292929';
    switch (bgColor) {
      case '#292929': color = '#FFFFFF';
        break;
      case '#607D8B': color = '#FFFFFF';
        break;
    }
    return color;
  }
}
