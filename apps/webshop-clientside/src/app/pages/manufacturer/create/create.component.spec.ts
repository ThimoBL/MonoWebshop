import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManufacturerComponent } from './create.component';

describe('CreateManufacturerComponent', () => {
  let component: CreateManufacturerComponent;
  let fixture: ComponentFixture<CreateManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateManufacturerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
