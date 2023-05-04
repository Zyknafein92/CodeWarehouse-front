import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {CodePageService} from "../../../services/code-page-service";
import {CodePage} from "../../../models/CodePage";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-pages-view',
  templateUrl: './pages-view.component.html',
  styleUrls: ['./pages-view.component.css']
})
export class PagesViewComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Nom', 'Modifier', 'Supprimer'];
  dataSource: MatTableDataSource<CodePage> = new MatTableDataSource<CodePage>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  projectUuid: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private codePageService: CodePageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.projectUuid = params['projectUuid'];
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.codePageService.getAllProjectPages(
            this.projectUuid,
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

  moveToAddPage() {
    this.router.navigate(['user/project', this.projectUuid, 'page', 'edit']);
  }
  moveToEditorView() {
    this.router.navigate(['/project/view', this.projectUuid]);
  }

  editPage(codePageUuid: string) {
    this.router.navigate(['user/project', this.projectUuid, 'page', 'edit', codePageUuid]);
  }

  deletePage(uuid: string) {
    this.codePageService.deleteCodePage(uuid).subscribe(
      next  => {
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error => {
        console.log(error.error.message) //todo: toast ?
      });
  }
}
