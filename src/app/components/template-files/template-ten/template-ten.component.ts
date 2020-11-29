import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-ten',
  templateUrl: './template-ten.component.html',
  styleUrls: ['./template-ten.component.scss']
})
export class TemplateTenComponent implements OnInit {
  @Input() pageType: string;
  @Input() isImageNeeded: boolean;
  pageHeight: string;
  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.pageType === 'single') {
      this.pageHeight = '27cm';
    } else {
      this.pageHeight = '54.9cm';
    }
  }

  ngOnInit(): void {
    if (this.pageType === 'single') {
      this.pageHeight = '27cm';
    } else {
      this.pageHeight = '54.9cm';
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

}
