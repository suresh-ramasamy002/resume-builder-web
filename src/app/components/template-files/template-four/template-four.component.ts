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
  public summaryMargin = 25;
  public workExpMargin = 25;
  public educationMargin = 25;
  public skillsMargin = 25;
  public certificateMargin = 25;
  public honorMargin = 25;
  public interestMargin = 25;
  public activityMargin = 25;
  public additionalInfoMargin = 25;
  public referenceMargin = 25;
  public techMargin = 25;
  public langMargin = 25;
  constructor(public coreDataService: CoreDataService, private sanitizer: DomSanitizer) {
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
      case '#343b46':
        color = '#FFFFFF';
        break;
      case '#353f58':
        color = '#FFFFFF';
        break;
    }
    return color;
  }
  moveSummary(pos) {
    if (pos === 'top' && this.summaryMargin > 25) {
      this.summaryMargin -= 10;
    } else if (pos === 'bottom') {
      this.summaryMargin += 10;
    }
  }
  moveWorkExp(pos) {
    if (pos === 'top' && this.workExpMargin > 25) {
      this.workExpMargin -= 10;
    } else if (pos === 'bottom') {
      this.workExpMargin += 10;
    }
  }
  moveEducation(pos) {
    if (pos === 'top' && this.educationMargin > 25) {
      this.educationMargin -= 10;
    } else if (pos === 'bottom') {
      this.educationMargin += 10;
    }
  }
  moveSkills(pos) {
    if (pos === 'top' && this.skillsMargin > 25) {
      this.skillsMargin -= 10;
    } else if (pos === 'bottom') {
      this.skillsMargin += 10;
    }
  }
  moveCertificates(pos) {
    if (pos === 'top' && this.certificateMargin > 25) {
      this.certificateMargin -= 10;
    } else if (pos === 'bottom') {
      this.certificateMargin += 10;
    }
  }
  moveInterest(pos) {
    if (pos === 'top' && this.interestMargin > 25) {
      this.interestMargin -= 10;
    } else if (pos === 'bottom') {
      this.interestMargin += 10;
    }
  }
  moveActivity(pos) {
    if (pos === 'top' && this.activityMargin > 25) {
      this.activityMargin -= 10;
    } else if (pos === 'bottom') {
      this.activityMargin += 10;
    }
  }
  moveAdditionalInfo(pos) {
    if (pos === 'top' && this.additionalInfoMargin > 25) {
      this.additionalInfoMargin -= 10;
    } else if (pos === 'bottom') {
      this.additionalInfoMargin += 10;
    }
  }
  moveReference(pos) {
    if (pos === 'top' && this.referenceMargin > 25) {
      this.referenceMargin -= 10;
    } else if (pos === 'bottom') {
      this.referenceMargin += 10;
    }
  }
  moveHonor(pos) {
    if (pos === 'top' && this.honorMargin > 25) {
      this.honorMargin -= 10;
    } else if (pos === 'bottom') {
      this.honorMargin += 10;
    }
  }
  moveTechSkills(pos) {
    if (pos === 'top' && this.techMargin > 25) {
      this.techMargin -= 10;
    } else if (pos === 'bottom') {
      this.techMargin += 10;
    }
  }
  moveLangSkills(pos) {
    if (pos === 'top' && this.langMargin > 25) {
      this.langMargin -= 10;
    } else if (pos === 'bottom') {
      this.langMargin += 10;
    }
  }
}
