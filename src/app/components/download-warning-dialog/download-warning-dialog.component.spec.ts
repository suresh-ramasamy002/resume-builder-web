import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWarningDialogComponent } from './download-warning-dialog.component';

describe('DownloadWarningDialogComponent', () => {
  let component: DownloadWarningDialogComponent;
  let fixture: ComponentFixture<DownloadWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadWarningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
