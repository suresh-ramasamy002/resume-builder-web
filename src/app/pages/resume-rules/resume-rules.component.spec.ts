import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeRulesComponent } from './resume-rules.component';

describe('ResumeRulesComponent', () => {
  let component: ResumeRulesComponent;
  let fixture: ComponentFixture<ResumeRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
