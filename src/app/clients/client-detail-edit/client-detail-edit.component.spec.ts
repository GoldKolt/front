import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailEditComponent } from './client-detail-edit.component';

describe('ClientDetailEditComponent', () => {
  let component: ClientDetailEditComponent;
  let fixture: ComponentFixture<ClientDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
