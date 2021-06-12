import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewStandardPartComponent } from './view-new-standard-part.component';

describe('ViewNewStandardPartComponent', () => {
  let component: ViewNewStandardPartComponent;
  let fixture: ComponentFixture<ViewNewStandardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewStandardPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewStandardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
