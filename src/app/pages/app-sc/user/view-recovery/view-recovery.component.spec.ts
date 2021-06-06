import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecoveryComponent } from './view-recovery.component';

describe('ViewRecoveryComponent', () => {
  let component: ViewRecoveryComponent;
  let fixture: ComponentFixture<ViewRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
