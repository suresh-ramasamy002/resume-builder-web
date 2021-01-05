import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCubicComponent } from './template-cubic.component';

describe('TemplateCubicComponent', () => {
  let component: TemplateCubicComponent;
  let fixture: ComponentFixture<TemplateCubicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCubicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCubicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
