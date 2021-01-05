import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIconicComponent } from './template-iconic.component';

describe('TemplateIconicComponent', () => {
  let component: TemplateIconicComponent;
  let fixture: ComponentFixture<TemplateIconicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateIconicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateIconicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
