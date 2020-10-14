import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TemplateRootComponent} from '../../../pages/templates/template-root.component';
import {CoreDataService} from '../../../services/core-data.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {
  constructor(public coreDataService: CoreDataService , private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }
  sanitize(url: string) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
