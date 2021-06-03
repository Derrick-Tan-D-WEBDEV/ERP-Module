import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewerComponent } from './add-viewer.component';

describe('AddViewerComponent', () => {
  let component: AddViewerComponent;
  let fixture: ComponentFixture<AddViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
