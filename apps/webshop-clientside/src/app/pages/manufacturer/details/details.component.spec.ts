import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsManufacturerComponent } from './details.component';

describe('DetailsManufacturerComponent', () => {
  let component: DetailsManufacturerComponent;
  let fixture: ComponentFixture<DetailsManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsManufacturerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
