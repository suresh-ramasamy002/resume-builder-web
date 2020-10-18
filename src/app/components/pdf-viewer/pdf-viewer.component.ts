import {
  Component,
  Input, Inject, OnInit, AfterViewInit, ViewChild, ElementRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CoreDataService} from '../../services/core-data.service';
import set = Reflect.set;
import {DomSanitizer} from '@angular/platform-browser';
declare var $: any;
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, AfterViewInit {
  constructor(public dialogRef: MatDialogRef<PdfViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private coreDataService: CoreDataService, private sanitizer: DomSanitizer, private http: HttpClient) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.coreDataService.showSpinner = false;
    }, 100);
  }

ngAfterViewInit() {

}
  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
