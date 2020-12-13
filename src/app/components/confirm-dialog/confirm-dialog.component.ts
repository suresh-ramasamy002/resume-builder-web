
import {
  OnInit,
  Component,
  Input, Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    .mat-raised-button {
      background: #2c3d73;
    }
    .mat-stroked-button {
      border: 1px solid #2c3d73;
      color:#2c3d73;
      background: transparent;
    }
  `]
})
export class ConfirmDialogComponent implements OnInit{


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
