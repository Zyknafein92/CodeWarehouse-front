import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  forms!: FormGroup;

  constructor(private router:Router, private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForms()
  }

  private initializeForms() {
    this.forms =this.formBuilder.group(
      {email: ['', [Validators.email, Validators.required]
        ]});
  }

  onSubmit() {
    this.userService.forgetPassword(this.forms.get('email')?.value).subscribe( next => {
    });
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
