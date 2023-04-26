import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project-service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit{
  forms!: FormGroup;
  uuid: string = '';
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
         this.uuid = params['projectUuid'];
        if (this.uuid) {
          this.patchValue(this.uuid);
        }
      });
    this.initializeForm();
  }

  onSubmit() {
    if (!this.uuid) {
      this.projectService.addProject(this.forms.value).subscribe(next => {
        this.router.navigate(['/user/projects']);
      });
    } else {
      this.projectService.updateProject(this.uuid, this.forms.value).subscribe( next => {
        this.router.navigate(['/user/projects']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/user/projects']);
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        ownerUuid: 'ef05abe2-e3c2-4a65-9944-d9a65c78a90d', //todo : refactor
        name: ['', Validators.required],
        description: ['', Validators.required],
        isProjectPublic: [false, Validators.required],
      }
    )
  }

  private patchValue(uuid: string) {
    this.projectService.getProject(uuid).subscribe( data => {
      this.forms.patchValue({
        projectUuid: data.projectUuid,
        ownerUuid: data.ownerUuid,
        name: data.name,
        description: data.description,
        isProjectPublic: data.isProjectPublic,
        codePageList: data.codePageList,
      })
    });
  }
}
