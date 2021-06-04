import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStandardPartComponent } from './view-standard-part.component';

describe('ViewStandardPartComponent', () => {
  let component: ViewStandardPartComponent;
  let fixture: ComponentFixture<ViewStandardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStandardPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStandardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
