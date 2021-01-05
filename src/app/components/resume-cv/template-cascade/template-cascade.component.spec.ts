import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCascadeComponent } from './template-cascade.component';

describe('TemplateCascadeComponent', () => {
  let component: TemplateCascadeComponent;
  let fixture: ComponentFixture<TemplateCascadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCascadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCascadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
