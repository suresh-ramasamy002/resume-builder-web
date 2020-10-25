import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFourComponent } from './template-four.component';

describe('TemplateFourComponent', () => {
  let component: TemplateFourComponent;
  let fixture: ComponentFixture<TemplateFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
