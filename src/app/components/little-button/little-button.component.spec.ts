import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleButtonComponent } from './little-button.component';

describe('LittleButtonComponent', () => {
  let component: LittleButtonComponent;
  let fixture: ComponentFixture<LittleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LittleButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LittleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
