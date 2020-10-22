import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-template-three',
  templateUrl: './template-three.component.html',
  styleUrls: ['./template-three.component.scss']
})
export class TemplateThreeComponent implements OnInit, OnChanges {
  @Input() pageType: string;
  @Input() isImageNeeded: boolean;
  value: number = 4;
  pageHeight: string;
  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }
ngOnChanges(changes: SimpleChanges) {
  if (this.pageType === 'single' && this.coreDataService.templateData.isImageNeeded) {
    this.pageHeight = '24.2cm';
  } else if (this.pageType === 'multi' && this.coreDataService.templateData.isImageNeeded) {
    this.pageHeight = '52.12cm';
  } else if (this.pageType === 'single' && !this.coreDataService.templateData.isImageNeeded) {
    this.pageHeight = '25.21cm';
  } else if (this.pageType === 'multi' && !this.coreDataService.templateData.isImageNeeded) {
    this.pageHeight = '53.20cm';
  }
}

  ngOnInit(): void {
    if (this.pageType === 'single' && this.coreDataService.templateData.isImageNeeded) {
      this.pageHeight = '24.2cm';
    } else if (this.pageType === 'multi' && this.coreDataService.templateData.isImageNeeded) {
      this.pageHeight = '52.12cm';
    } else if (this.pageType === 'single' && !this.coreDataService.templateData.isImageNeeded) {
      this.pageHeight = '25.21cm';
    } else if (this.pageType === 'multi' && !this.coreDataService.templateData.isImageNeeded) {
      this.pageHeight = '53.20cm';
    }
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
