import {
  Component,
  Input, Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
export type OutputType = 'base64' | 'file' | 'both';
@Component({
  selector: 'app-image-upload-crop',
  templateUrl: './image-upload-crop.component.html',
  styleUrls: ['./image-upload-crop.component.scss']
})
export class ImageUploadCropComponent {
  @Input()
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ImageUploadCropComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
