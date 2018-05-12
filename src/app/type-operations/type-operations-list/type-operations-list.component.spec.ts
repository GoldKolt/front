import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOperationsListComponent } from './type-operations-list.component';

describe('TypeOperationsListComponent', () => {
  let component: TypeOperationsListComponent;
  let fixture: ComponentFixture<TypeOperationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOperationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOperationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
