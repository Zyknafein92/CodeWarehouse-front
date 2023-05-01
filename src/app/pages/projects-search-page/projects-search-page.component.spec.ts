import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSearchPageComponent } from './projects-search-page.component';

describe('ProjectsSearchPageComponent', () => {
  let component: ProjectsSearchPageComponent;
  let fixture: ComponentFixture<ProjectsSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsSearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
