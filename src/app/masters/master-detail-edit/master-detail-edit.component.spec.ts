import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDetailEditComponent } from './master-detail-edit.component';

describe('MasterDetailEditComponent', () => {
  let component: MasterDetailEditComponent;
  let fixture: ComponentFixture<MasterDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
