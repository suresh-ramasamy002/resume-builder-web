import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNineComponent } from './template-nine.component';

describe('TemplateNineComponent', () => {
  let component: TemplateNineComponent;
  let fixture: ComponentFixture<TemplateNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
