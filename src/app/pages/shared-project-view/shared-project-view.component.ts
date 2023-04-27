import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CodePage} from "../../../models/CodePage";
import {CodePageService} from "../../../services/code-page-service";
import {ProjectService} from "../../../services/project-service";
import {Project} from "../../../models/Project";

@Component({
  selector: 'app-shared-project-view',
  templateUrl: './shared-project-view.component.html',
  styleUrls: ['./shared-project-view.component.css']
})
export class SharedProjectViewComponent implements OnInit {

  projectUuid: string = '';
  codePage!: CodePage;
  project!: Project;
  isProjectViewActive = false;
  isNotesViewActive = true;

  constructor(private activatedRoute: ActivatedRoute,
              private codePageService: CodePageService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.projectUuid = params['projectUuid'];
      });
    this.initData();
  }

  private initData(): void {
    this.projectService.getProject(this.projectUuid).subscribe(data => {
      this.project = data;
      this.codePage = this.project.codePageList[0];
      console.log(this.codePage)
    });
  }

  switchDisplayMode(): void {
    this.isProjectViewActive = !this.isProjectViewActive;
    this.isNotesViewActive = !this.isNotesViewActive;
  }

  displayNewCodePage(codePageUuid: string): void {
    this.codePageService.getCodePage(codePageUuid).subscribe( data => {
      this.codePage = data;
    });
  }

  switchCodePageModificationStatusMode() {
    this.codePage.isLocked = !this.codePage.isLocked;
    this.codePageService.updateCodePageModificationStatus(this.codePage.codePageUuid, this.codePage.isLocked)
      .subscribe(resp => {
        this.codePage.isLocked = resp.valueOf();
      })
  }
}
