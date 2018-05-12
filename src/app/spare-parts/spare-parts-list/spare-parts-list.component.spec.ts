import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartsListComponent } from './spare-parts-list.component';

describe('SparePartsListComponent', () => {
  let component: SparePartsListComponent;
  let fixture: ComponentFixture<SparePartsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparePartsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparePartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
