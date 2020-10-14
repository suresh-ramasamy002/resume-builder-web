import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadCropComponent } from './image-upload-crop.component';

describe('ImageUploadCropComponent', () => {
  let component: ImageUploadCropComponent;
  let fixture: ComponentFixture<ImageUploadCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
