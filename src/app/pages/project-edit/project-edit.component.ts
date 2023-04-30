import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project-service";
import {UserService} from "../../../services/user-service";

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
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
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
    this.initUser();
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

  private initializeForm(): void {
    this.forms = this.formBuilder.group(
      {
        ownerUuid: '',
        name: ['', Validators.required],
        description: ['', Validators.required],
        isProjectPublic: [false, Validators.required],
      }
    )
  }

  private patchValue(uuid: string) :void {
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

  private initUser(): void {
    this.userService.getUserProfil().subscribe( data =>
    this.forms.patchValue({
      ownerUuid: data.userUuid
    }));
  }
}
