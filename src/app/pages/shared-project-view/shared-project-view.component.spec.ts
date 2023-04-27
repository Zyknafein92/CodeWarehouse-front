import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProjectViewComponent } from './shared-project-view.component';

describe('SharedProjectViewComponent', () => {
  let component: SharedProjectViewComponent;
  let fixture: ComponentFixture<SharedProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedProjectViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
