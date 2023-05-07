import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CodePageService} from "../../../services/code-page-service";

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit{

  forms!: FormGroup;
  projectUuid: string = '';
  codePageUuid: string = '';
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private codePageService: CodePageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.codePageUuid = params['codePageUuid'];
        this.projectUuid = params['projectUuid']
        if (this.codePageUuid) {
          this.patchValue(this.codePageUuid);
        }
      });
    this.initializeForm();
  }

  onSubmit(): void {
    if (!this.codePageUuid) {
      this.codePageService.addCodePage(this.forms.value).subscribe(resp => {
        this.router.navigate(['user/project', this.projectUuid, 'pages']);
      });
    } else {
      this.codePageService.updateCodePage(this.projectUuid, this.forms.value).subscribe(resp => {
        this.router.navigate(['user/project', this.projectUuid, 'pages']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['user/project', this.projectUuid, 'pages']);
  }

  private initializeForm(): void {
    this.forms = this.formBuilder.group(
      {
        projectUuid: this.projectUuid,
        name: ['', Validators.required],
        language: ['', Validators.required],
        isEditable : [true],
        codeTextContent: ['', Validators.required],
        codeCommentary: ['Aucun commentaire n\'a été saisi pour le moment.', Validators.required],
      }
    )
  }

  private patchValue(uuid: string) {
    this.codePageService.getCodePage(uuid).subscribe( data => {
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
}
