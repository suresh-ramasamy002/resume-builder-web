import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMuseComponent } from './template-muse.component';

describe('TemplateMuseComponent', () => {
  let component: TemplateMuseComponent;
  let fixture: ComponentFixture<TemplateMuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateMuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
