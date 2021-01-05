import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateVibesComponent } from './template-vibes.component';

describe('TemplateVibesComponent', () => {
  let component: TemplateVibesComponent;
  let fixture: ComponentFixture<TemplateVibesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateVibesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateVibesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
