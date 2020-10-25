import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-four',
  templateUrl: './template-four.component.html',
  styleUrls: ['./template-four.component.scss']
})
export class TemplateFourComponent implements OnInit {
  @Input() pageType: string;
  @Input() isImageNeeded: boolean;
  pageHeight: string;

  constructor(public coreDataService: CoreDataService, private sanitizer: DomSanitizer) {
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
      case '#292929':
        color = '#FFFFFF';
        break;
      case '#353f58':
        color = '#FFFFFF';
        break;
    }
    return color;
  }
}
