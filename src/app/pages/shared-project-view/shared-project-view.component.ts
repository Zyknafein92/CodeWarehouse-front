import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CodePage} from "../../../models/CodePage";
import {CodePageService} from "../../../services/code-page-service";
import {ProjectService} from "../../../services/project-service";
import {Project} from "../../../models/Project";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {TokenStorageService} from "../../../services/Security/token-storage.service";
import {UserService} from "../../../services/user-service";

@Component({
  selector: 'app-shared-project-view',
  templateUrl: './shared-project-view.component.html',
  styleUrls: ['./shared-project-view.component.css'],
})
export class SharedProjectViewComponent implements OnInit {

  user?: User;
  projectUuid: string = '';
  codePage!: CodePage;
  project!: Project;
  isProjectViewActive = false;
  isNotesViewActive = true;
  forms!: FormGroup;
  changedCode: boolean = false;
  isUserOwner: boolean = false;
  isReadOnly: boolean = true;
  mobileViewContentIsDisplay: boolean = false;
  _save: any = null;
  contentStatusIsMobile: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private codePageService: CodePageService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private tokenService: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.projectUuid = params['projectUuid'];
      });
    this.initializeForm();
    this.initData();
    this.onResize();
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
    this.codePage.isEditable = !this.codePage?.isEditable;
    this.codePageService.updateCodePageModificationStatus(this.codePage.codePageUuid, this.codePage.isEditable)
      .subscribe(resp => {
        this.codePage.isEditable = resp.valueOf();
      })
  }

  checkifModificationAllowed(): void {
    if (this.isUserOwner) {
      this.isReadOnly = false;
    }
    if (!this.isUserOwner) {
      this.isReadOnly = !this.codePage.isEditable;
    }
  }

  private initializeForm(): void {
    this.forms = this.formBuilder.group(
      {
        isEditable:[false],
        codeCommentary: ['', Validators.required],
      }
    )
  }

  private initData(): void {
    this.projectService.getProject(this.projectUuid).subscribe(data => {
      this.project = data;
      this.codePage = this.project.codePageList[0];
      this.patchValue();
      this.getUserProfil();
      this.checkifModificationAllowed();
      this.saveCode();
      this.refreshCode();
    });

  }

  private patchValue(): void {
    this.codePageService.getCodePage(this.codePage.codePageUuid).subscribe( data => {
      this.forms.patchValue({
        codePageUuid: data.codePageUuid,
        projectUuid: data.projectUuid,
        name: data.name,
        language: data.language,
        isEditable : data.isEditable,
        codeCommentary: data.codeCommentary,
        codeTextContent: data.codeTextContent
      })
    });
  }

  private getUserProfil() {
    this.userService.getUserProfil().subscribe(data => {
      this.user = data;
      if(this.project) {
        if(this.user.userUuid == this.project.ownerUuid) this.isUserOwner = true;
      }
    });
  }

  editContent() {
    window.clearTimeout(this._save);
    this._save = null;
    this.changedCode = true;
    this._save = setTimeout(() => {
      this.saveCode();
    }, 1000);
  }

  saveCode() : void {
    this.codePageService.updateCodePage(this.codePage.codePageUuid, this.codePage).subscribe( res => {
      this.changedCode = false;
      this.codePage = res;
      this.checkifModificationAllowed();
    });
  }

  private refreshCode() {
    setTimeout(() => this.refreshCode(), 3000);
    if( !this.changedCode ) {
      this.codePageService.getCodePage(this.codePage.codePageUuid).subscribe( res => {
        if ((this.codePage.codeCommentary != res.codeCommentary) ||
          (this.codePage.codeTextContent != res.codeTextContent) ||
          (this.codePage.isEditable != res.isEditable)) {
          this.codePage = res;
          this.patchValue();
          this.checkifModificationAllowed();
        }
      });
    }
  }

  saveCodeCommentary() {
    let codePageUpdated = this.codePage;
    codePageUpdated.codeCommentary = this.forms.get('codeCommentary')?.value;
    this.codePageService.updateCodePage(this.codePage.codePageUuid, codePageUpdated).subscribe( res => {
      this.codePage = res;
      this.checkifModificationAllowed();
    });
  }

  displaySideBarContent(): boolean {
    return this.mobileViewContentIsDisplay = !this.mobileViewContentIsDisplay;
  }

  @HostListener('window:resize')
  onResize(): boolean {
    this.contentStatusIsMobile = window.outerWidth < 1024
    return this.contentStatusIsMobile;
  }

  protected readonly window = window;
  protected readonly Infinity = Infinity;
}

