import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedViewComponent } from './paginated-view.component';

describe('PaginatedViewComponent', () => {
  let component: PaginatedViewComponent;
  let fixture: ComponentFixture<PaginatedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
