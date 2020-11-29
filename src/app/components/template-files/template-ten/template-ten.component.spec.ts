import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTenComponent } from './template-ten.component';

describe('TemplateTenComponent', () => {
  let component: TemplateTenComponent;
  let fixture: ComponentFixture<TemplateTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
