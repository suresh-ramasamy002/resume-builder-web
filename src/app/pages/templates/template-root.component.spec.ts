import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRootComponent } from './template-root.component';

describe('TemplateRootComponent', () => {
  let component: TemplateRootComponent;
  let fixture: ComponentFixture<TemplateRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
