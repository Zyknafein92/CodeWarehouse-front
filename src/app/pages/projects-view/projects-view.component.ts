import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Project} from "../../../models/Project";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {ProjectService} from "../../../services/project-service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nom du projet', 'Visibilité du projet', 'Modifier', 'Supprimer'];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService,
              private router: Router) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.projectService.getAllProjectOfUser(
            this.paginator.pageSize,
            this.paginator.pageIndex,
          ).pipe(catchError(() => of(null)));
        }),
        map(dataSource => {
          this.isLoadingResults = false;
          this.isRateLimitReached = dataSource === null;
          if (dataSource === null) {
            return [];
          }
          this.resultsLength = dataSource.length;
          return dataSource;
        }),
      )
      .subscribe(data => {
        if (data === null) {
          return [];
        }
        this.dataSource.data = data;
        return this.dataSource;
      });
  }

  moveToAddProject() {
    this.router.navigate(['user/project/edit'])
  }

  moveToProjectPagesView(project: Project) {
    this.router.navigate(['user/project', project.projectUuid, 'pages']);
  }

  editProject(uuid: string) {
    this.router.navigate(['user/project/edit', uuid]);
  }

  deleteProject(uuid: string) {
    this.projectService.deleteProject(uuid).subscribe(
      next  => {
        //trigger for render table again without delete value
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error => {
        console.log(error.error.message)
      });

  }
}
