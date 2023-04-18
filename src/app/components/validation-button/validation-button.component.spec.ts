import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationButtonComponent } from './validation-button.component';

describe('ValidationButtonComponent', () => {
  let component: ValidationButtonComponent;
  let fixture: ComponentFixture<ValidationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
