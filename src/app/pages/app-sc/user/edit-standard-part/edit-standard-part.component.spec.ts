import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandardPartComponent } from './edit-standard-part.component';

describe('EditStandardPartComponent', () => {
  let component: EditStandardPartComponent;
  let fixture: ComponentFixture<EditStandardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStandardPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStandardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
