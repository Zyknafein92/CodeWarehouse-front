import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Project} from "../../../models/Project";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {ProjectService} from "../../../services/project-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nom du projet', 'Modifier', 'Supprimer'];
  data: Project[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectService: ProjectService,
              private router: Router) {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.projectService.getAllProjectOfUser(
            30,
            this.paginator.pageIndex,
            this.sort,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.length;
          return data;
        }),
      )
      .subscribe(data => (this.data = data));
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
        let item = this.data.find(item => item.projectUuid === uuid);
        this.data.splice(this.data.indexOf(item!));
        //trigger for render table again without delete value
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error => {
        console.log(error.error.message)
      });

  }
}
