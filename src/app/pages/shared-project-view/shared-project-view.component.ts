import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CodePage} from "../../../models/CodePage";
import {CodePageService} from "../../../services/code-page-service";
import {ProjectService} from "../../../services/project-service";
import {Project} from "../../../models/Project";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  forms!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private codePageService: CodePageService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.projectUuid = params['projectUuid'];
      });
    this.initializeForm();
    this.initData();
  }

  switchDisplayModeToProject(): void {
    this.isProjectViewActive = true;
    this.isNotesViewActive = false;
  }

  switchDisplayModeToCommentary(): void {
    this.isProjectViewActive = false;
    this.isNotesViewActive = true;
  }

  displayNewCodePage(codePageUuid: string): void {
    this.codePageService.getCodePage(codePageUuid).subscribe( data => {
      this.codePage = data;
      this.patchValue();
    });
  }

  switchCodePageModificationStatusMode(): void {
    this.codePage.isLocked = !this.codePage.isLocked;
    console.log(this.codePage.isLocked)
    this.codePageService.updateCodePageModificationStatus(this.codePage.codePageUuid, this.codePage.isLocked)
      .subscribe(resp => {
        this.codePage.isLocked = resp.valueOf();
      })
  }

  private initializeForm(): void {
    this.forms = this.formBuilder.group(
      {
        isLocked:[true],
        codeCommentary: ['', Validators.required],
      }
    )
  }

  private initData(): void {
    this.projectService.getProject(this.projectUuid).subscribe(data => {
      this.project = data;
      this.codePage = this.project.codePageList[0];
      this.patchValue();
    });
  }

  private patchValue(): void {
    this.codePageService.getCodePage(this.codePage.codePageUuid).subscribe( data => {
      this.forms.patchValue({
        isLocked : data.isLocked,
        codeCommentary: data.codeCommentary,
      })
    });
  }
}
