import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  forms!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required]
      }
    )
  }

  onSubmit(): void {

  }

  cancel():void {
    this.router.navigate(['/home']);
  }
}
