import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Project} from "../../../models/Project";
import {ProjectService} from "../../../services/project-service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-projects-search-page',
  templateUrl: './projects-search-page.component.html',
  styleUrls: ['./projects-search-page.component.css']
})
export class ProjectsSearchPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nom du projet', 'Description', 'Voir'];
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

  moveToProjectPagesView(projectUuid: any) {
    this.router.navigate(['/project/view', projectUuid]);
  }
}
