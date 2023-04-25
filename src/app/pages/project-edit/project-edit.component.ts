import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../../../services/project-service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit{
  forms!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.initializeForm();
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

  onSubmit() {
    this.projectService.addProject(this.forms.value).subscribe( project => console.log(project));
  }

  cancel() {
  this.router.navigate(['/user/projects']);
  }
}
