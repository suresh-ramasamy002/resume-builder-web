import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInfluxComponent } from './template-influx.component';

describe('TemplateInfluxComponent', () => {
  let component: TemplateInfluxComponent;
  let fixture: ComponentFixture<TemplateInfluxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateInfluxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateInfluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
