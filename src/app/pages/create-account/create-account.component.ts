import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  forms!: FormGroup;
  errorMessage: '' = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]
        )),
        password2: new FormControl('',Validators.compose( [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]))
      }, {validators: passwordMatchValidator}
    )
  }

  onSubmit(): void {
    if (this.forms.invalid) {
      this.forms.markAllAsTouched();
      return;
    }
    this.userService.addUser(this.forms.value).subscribe(  {
      complete: () => {},
      error: (error) => {
        this.errorMessage = error.error.message;
      },
      next: () => {
        this.router.navigate(['/']) },
    });
  }

  cancel():void {
    this.router.navigate(['/home']);
  }
  onPasswordInput(): void {
    if (this.forms.hasError('passwordMismatch'))
      this.forms.get('password2')?.setErrors([{'passwordMismatch': true}]);
    else
      this.forms.get('password2')?.setErrors(null);
  }
}

export const passwordMatchValidator: Validators = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('password2')?.value)
    return null;
  else
    return {passwordMismatch: true};
};
