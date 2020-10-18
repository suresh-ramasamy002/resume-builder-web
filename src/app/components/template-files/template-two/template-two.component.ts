import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit, OnChanges {
@Input() pageType: string;
@Input() isImageNeeded: boolean;
pageHeight: string;
  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }
ngOnChanges(changes: SimpleChanges) {
    if (this.pageType === 'single') {
      this.pageHeight = '27.9cm';
    } else {
      this.pageHeight = '55.8cm';
    }
}

  ngOnInit(): void {
    if (this.pageType === 'single') {
      this.pageHeight = '27.9cm';
    } else {
      this.pageHeight = '55.8cm';
    }
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
  checkContainerHeight() {
    return document.getElementById('template-container').offsetHeight;
  }
}
