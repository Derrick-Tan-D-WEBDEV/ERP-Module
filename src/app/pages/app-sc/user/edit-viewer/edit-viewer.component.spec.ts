import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewerComponent } from './edit-viewer.component';

describe('EditViewerComponent', () => {
  let component: EditViewerComponent;
  let fixture: ComponentFixture<EditViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
