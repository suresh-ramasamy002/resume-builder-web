import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {TemplateRootComponent} from '../../../pages/templates/template-root.component';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {
  @Input() pageType: string;
  @Input() isImageNeeded: boolean;
  pageHeight: string;
  public summaryMargin = 15;
  public workExpMargin = 15;
  public educationMargin = 15;
  public skillsMargin = 15;
  public certificateMargin = 15;
  public honorMargin = 15;
  public interestMargin = 15;
  public activityMargin = 15;
  public additionalInfoMargin = 15;
  public referenceMargin = 15;
  public techMargin = 15;
  public langMargin = 15;
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
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  moveSummary(pos) {
    if (pos === 'top' && this.summaryMargin > 15) {
      this.summaryMargin -= 10;
    } else if (pos === 'bottom') {
      this.summaryMargin += 10;
    }
  }
  moveWorkExp(pos) {
    if (pos === 'top' && this.workExpMargin > 15) {
      this.workExpMargin -= 10;
    } else if (pos === 'bottom') {
      this.workExpMargin += 10;
    }
  }
  moveEducation(pos) {
    if (pos === 'top' && this.educationMargin > 15) {
      this.educationMargin -= 10;
    } else if (pos === 'bottom') {
      this.educationMargin += 10;
    }
  }
  moveSkills(pos) {
    if (pos === 'top' && this.skillsMargin > 15) {
      this.skillsMargin -= 10;
    } else if (pos === 'bottom') {
      this.skillsMargin += 10;
    }
  }
  moveCertificates(pos) {
    if (pos === 'top' && this.certificateMargin > 15) {
      this.certificateMargin -= 10;
    } else if (pos === 'bottom') {
      this.certificateMargin += 10;
    }
  }
  moveInterest(pos) {
    if (pos === 'top' && this.interestMargin > 15) {
      this.interestMargin -= 10;
    } else if (pos === 'bottom') {
      this.interestMargin += 10;
    }
  }
  moveActivity(pos) {
    if (pos === 'top' && this.activityMargin > 15) {
      this.activityMargin -= 10;
    } else if (pos === 'bottom') {
      this.activityMargin += 10;
    }
  }
  moveAdditionalInfo(pos) {
    if (pos === 'top' && this.additionalInfoMargin > 15) {
      this.additionalInfoMargin -= 10;
    } else if (pos === 'bottom') {
      this.additionalInfoMargin += 10;
    }
  }
  moveReference(pos) {
    if (pos === 'top' && this.referenceMargin > 15) {
      this.referenceMargin -= 10;
    } else if (pos === 'bottom') {
      this.referenceMargin += 10;
    }
  }
  moveHonor(pos) {
    if (pos === 'top' && this.honorMargin > 15) {
      this.honorMargin -= 10;
    } else if (pos === 'bottom') {
      this.honorMargin += 10;
    }
  }
  moveTechSkills(pos) {
    if (pos === 'top' && this.techMargin > 15) {
      this.techMargin -= 10;
    } else if (pos === 'bottom') {
      this.techMargin += 10;
    }
  }
  moveLangSkills(pos) {
    if (pos === 'top' && this.langMargin > 15) {
      this.langMargin -= 10;
    } else if (pos === 'bottom') {
      this.langMargin += 10;
    }
  }
}
