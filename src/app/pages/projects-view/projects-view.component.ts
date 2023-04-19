import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Project} from "../../../models/Project";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {ProjectService} from "../../../services/project-service";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['Nom du projet', 'Visibilitée', 'Modifier', 'Supprimer'];
  data: Project[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clickedRows: any;

  constructor(private projectService: ProjectService) {
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.projectService.getAllProjects(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
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
}
