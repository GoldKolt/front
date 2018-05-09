import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServComponent } from './edit-serv.component';

describe('EditServComponent', () => {
  let component: EditServComponent;
  let fixture: ComponentFixture<EditServComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
