import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit{
  forms!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        isProjectPublic: [false, Validators.required],
      }
    )
  }

  onSubmit() {
  }

  cancel() {
  this.router.navigate(['/user/projects']);
  }
}
