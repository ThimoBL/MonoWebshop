import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManufacturerComponent } from './update.component';

describe('UpdateManufacturerComponent', () => {
  let component: UpdateManufacturerComponent;
  let fixture: ComponentFixture<UpdateManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateManufacturerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
