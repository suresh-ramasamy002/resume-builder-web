import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEnfoldComponent } from './template-enfold.component';

describe('TemplateEnfoldComponent', () => {
  let component: TemplateEnfoldComponent;
  let fixture: ComponentFixture<TemplateEnfoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateEnfoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEnfoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
