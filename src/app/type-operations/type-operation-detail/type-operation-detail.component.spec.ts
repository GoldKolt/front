import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOperationDetailComponent } from './type-operation-detail.component';

describe('TypeOperationDetailComponent', () => {
  let component: TypeOperationDetailComponent;
  let fixture: ComponentFixture<TypeOperationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOperationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOperationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
