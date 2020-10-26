import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFiveComponent } from './template-five.component';

describe('TemplateFiveComponent', () => {
  let component: TemplateFiveComponent;
  let fixture: ComponentFixture<TemplateFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
