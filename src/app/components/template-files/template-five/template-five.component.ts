import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-five',
  templateUrl: './template-five.component.html',
  styleUrls: ['./template-five.component.scss']
})
export class TemplateFiveComponent implements OnInit, OnChanges {
  @Input() pageType: string;
  @Input() isImageNeeded: boolean;
  pageHeight: string;
  constructor(public coreDataService: CoreDataService, private sanitizer: DomSanitizer) { }
  ngOnChanges(changes: SimpleChanges) {
    if (this.pageType === 'single') {
      this.pageHeight = '26.9cm';
    } else {
      this.pageHeight = '54.8cm';
    }
    console.log(this.pageHeight);
  }

  ngOnInit(): void {
    if (this.pageType === 'single') {
      this.pageHeight = '26.9cm';
    } else {
      this.pageHeight = '54.8cm';
    }
  }

  setTextColor(bgColor) {
    let color = '#292929';
    switch (bgColor) {
      case '#343b46':
        color = '#FFFFFF';
        break;
      case '#353f58':
        color = '#FFFFFF';
        break;
    }
    return color;
  }
}
