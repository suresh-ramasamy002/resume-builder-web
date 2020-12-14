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
  public summaryMargin = 20;
  public workExpMargin = 20;
  public educationMargin = 20;
  public skillsMargin = 20;
  public certificateMargin = 20;
  public honorMargin = 20;
  public interestMargin = 20;
  public activityMargin = 20;
  public additionalInfoMargin = 20;
  public referenceMargin = 20;
  public techMargin = 20;
  public langMargin = 20;

  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.pageType === 'single') {
      this.pageHeight = '29.68cm';
    } else {
      this.pageHeight = '59.38cm';
    }
  }

  ngOnInit(): void {
    if (this.pageType === 'single') {
      this.pageHeight = '29.68cm';
    } else {
      this.pageHeight = '59.38cm';
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
      case '#339120': color = '#FFFFFF';
        break;
      case '#025923': color = '#FFFFFF';
        break;
      case '#007c73': color = '#FFFFFF';
        break;
      case '#00494d': color = '#FFFFFF';
        break;
      case '#04b4ff': color = '#FFFFFF';
        break;
      case '#009bdf': color = '#FFFFFF';
        break;
      case '#0075a7': color = '#FFFFFF';
        break;
      case '#003d74': color = '#FFFFFF';
        break;
      case '#542494': color = '#FFFFFF';
        break;
      case '#731c92': color = '#FFFFFF';
        break;
      case '#bf271f': color = '#FFFFFF';
        break;
      case '#7d1914': color = '#FFFFFF';
        break;
      case '#454c57': color = '#FFFFFF';
        break;
      case '#000000': color = '#FFFFFF';
        break;
    }
    return color;
  }
  checkContainerHeight() {
    return document.getElementById('template-container').offsetHeight;
  }
  moveSummary(pos) {
    if (pos === 'top' && this.summaryMargin > 20) {
      this.summaryMargin -= 10;
    } else if (pos === 'bottom') {
      this.summaryMargin += 10;
    }
  }
  moveWorkExp(pos) {
    if (pos === 'top' && this.workExpMargin > 20) {
      this.workExpMargin -= 10;
    } else if (pos === 'bottom') {
      this.workExpMargin += 10;
    }
  }
  moveEducation(pos) {
    if (pos === 'top' && this.educationMargin > 20) {
      this.educationMargin -= 10;
    } else if (pos === 'bottom') {
      this.educationMargin += 10;
    }
  }
  moveSkills(pos) {
    if (pos === 'top' && this.skillsMargin > 20) {
      this.skillsMargin -= 10;
    } else if (pos === 'bottom') {
      this.skillsMargin += 10;
    }
  }
  moveCertificates(pos) {
    if (pos === 'top' && this.certificateMargin > 20) {
      this.certificateMargin -= 10;
    } else if (pos === 'bottom') {
      this.certificateMargin += 10;
    }
  }
  moveInterest(pos) {
    if (pos === 'top' && this.interestMargin > 20) {
      this.interestMargin -= 10;
    } else if (pos === 'bottom') {
      this.interestMargin += 10;
    }
  }
  moveActivity(pos) {
    if (pos === 'top' && this.activityMargin > 20) {
      this.activityMargin -= 10;
    } else if (pos === 'bottom') {
      this.activityMargin += 10;
    }
  }
  moveAdditionalInfo(pos) {
    if (pos === 'top' && this.additionalInfoMargin > 20) {
      this.additionalInfoMargin -= 10;
    } else if (pos === 'bottom') {
      this.additionalInfoMargin += 10;
    }
  }
  moveReference(pos) {
    if (pos === 'top' && this.referenceMargin > 20) {
      this.referenceMargin -= 10;
    } else if (pos === 'bottom') {
      this.referenceMargin += 10;
    }
  }
  moveHonor(pos) {
    if (pos === 'top' && this.honorMargin > 20) {
      this.honorMargin -= 10;
    } else if (pos === 'bottom') {
      this.honorMargin += 10;
    }
  }
  moveTechSkills(pos) {
    if (pos === 'top' && this.techMargin > 20) {
      this.techMargin -= 10;
    } else if (pos === 'bottom') {
      this.techMargin += 10;
    }
  }
  moveLangSkills(pos) {
    if (pos === 'top' && this.langMargin > 20) {
      this.langMargin -= 10;
    } else if (pos === 'bottom') {
      this.langMargin += 10;
    }
  }
}
