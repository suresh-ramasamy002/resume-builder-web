import {
  Component,
  Input, Inject, OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CoreDataService} from '../../services/core-data.service';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PdfViewerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.coreDataService.showSpinner = false;
    }, 100);
  }

}
