import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEightComponent } from './template-eight.component';

describe('TemplateEightComponent', () => {
  let component: TemplateEightComponent;
  let fixture: ComponentFixture<TemplateEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
