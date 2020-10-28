import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-seven',
  templateUrl: './template-seven.component.html',
  styleUrls: ['./template-seven.component.scss']
})
export class TemplateSevenComponent implements OnInit {
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
      case '#343b46': color = '#FFFFFF';
        break;
      case '#353f58': color = '#FFFFFF';
        break;
      case '#414141': color = '#FFFFFF';
        break;
    }
    return color;
  }
  checkContainerHeight() {
    return document.getElementById('template-container').offsetHeight;
  }
}
