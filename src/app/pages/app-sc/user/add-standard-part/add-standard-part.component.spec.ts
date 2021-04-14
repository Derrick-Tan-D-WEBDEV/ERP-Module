import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardPartComponent } from './add-standard-part.component';

describe('AddStandardPartComponent', () => {
  let component: AddStandardPartComponent;
  let fixture: ComponentFixture<AddStandardPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandardPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandardPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
