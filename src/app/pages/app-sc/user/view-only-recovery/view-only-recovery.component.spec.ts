import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnlyRecoveryComponent } from './view-only-recovery.component';

describe('ViewOnlyRecoveryComponent', () => {
  let component: ViewOnlyRecoveryComponent;
  let fixture: ComponentFixture<ViewOnlyRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOnlyRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOnlyRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
