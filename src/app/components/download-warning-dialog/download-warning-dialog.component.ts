import {
  OnInit,
  Component,
  Input, Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-download-warning-dialog',
  templateUrl: './download-warning-dialog.component.html',
  styleUrls: ['./download-warning-dialog.component.scss']
})
export class DownloadWarningDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DownloadWarningDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
