import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCrispComponent } from './template-crisp.component';

describe('TemplateCrispComponent', () => {
  let component: TemplateCrispComponent;
  let fixture: ComponentFixture<TemplateCrispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCrispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCrispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
