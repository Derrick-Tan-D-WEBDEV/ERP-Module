import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnStandardPartComponent } from './view-own-standard-part.component';

describe('ViewOwnStandardPartComponent', () => {
  let component: ViewOwnStandardPartComponent;
  let fixture: ComponentFixture<ViewOwnStandardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnStandardPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnStandardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
