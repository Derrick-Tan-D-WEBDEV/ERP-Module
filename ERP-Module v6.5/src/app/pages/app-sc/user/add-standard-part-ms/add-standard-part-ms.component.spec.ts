import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardPartMsComponent } from './add-standard-part-ms.component';

describe('AddStandardPartMsComponent', () => {
  let component: AddStandardPartMsComponent;
  let fixture: ComponentFixture<AddStandardPartMsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandardPartMsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandardPartMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
