import { Component, Output, EventEmitter, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageUploadCropComponent} from '../image-upload-crop/image-upload-crop.component';
import {CoreDataService} from '../../services/core-data.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  public form: FormGroup;
  public imageFile = null;
  public croppedFile = null;
  public encodedUrl = null;
  constructor(private builder: FormBuilder, public dialog: MatDialog, private coreDataService: CoreDataService) {
    this.form = this.builder.group({
      files: ['', Validators.required]
    });
  }

  submit(event) {
    this.imageFile = event;
    this.openDialog();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(ImageUploadCropComponent, {
      width: '350px',
      data: { file: this.imageFile}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.croppedFile = result;
      console.log(this.croppedFile);
      if(this.croppedFile) {
        this.croppedFile = this.dataURItoBlob(this.croppedFile);
        let imageFile = new Blob([this.croppedFile], {
          type: 'image/jpeg' // must match the Accept type
        });
        this.coreDataService.templateData.image = window.URL.createObjectURL(imageFile);
      }
    });
  }
  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }
}
