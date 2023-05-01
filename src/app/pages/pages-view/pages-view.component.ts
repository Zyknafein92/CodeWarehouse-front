import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {CodePageService} from "../../../services/code-page-service";
import {CodePage} from "../../../models/CodePage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pages-view',
  templateUrl: './pages-view.component.html',
  styleUrls: ['./pages-view.component.css']
})
export class PagesViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nom', 'Modifier', 'Supprimer'];
  data: CodePage[] = [];
  projectUuid: string = '';

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


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
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.codePageService.getAllProjectPages(
            this.projectUuid,
            20,
            this.paginator.pageIndex,
            this.sort,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.length;
          return data;
        }),
      )
      .subscribe(data => {
        (this.data = data);
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
        let item = this.data.find(item => item.codePageUuid === uuid);
        this.data.splice(this.data.indexOf(item!));
        //trigger for render table again without delete value
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error => {
        console.log(error.error.message) //todo: toast ?
      });
  }
}
