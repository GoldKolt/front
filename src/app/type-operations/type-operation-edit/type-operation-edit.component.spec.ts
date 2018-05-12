import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOperationEditComponent } from './type-operation-edit.component';

describe('TypeOperationEditComponent', () => {
  let component: TypeOperationEditComponent;
  let fixture: ComponentFixture<TypeOperationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOperationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOperationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
