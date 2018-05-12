import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartDetailComponent } from './spare-part-detail.component';

describe('SparePartDetailComponent', () => {
  let component: SparePartDetailComponent;
  let fixture: ComponentFixture<SparePartDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparePartDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparePartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
