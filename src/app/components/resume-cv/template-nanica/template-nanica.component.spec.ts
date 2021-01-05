import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNanicaComponent } from './template-nanica.component';

describe('TemplateNanicaComponent', () => {
  let component: TemplateNanicaComponent;
  let fixture: ComponentFixture<TemplateNanicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNanicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNanicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
