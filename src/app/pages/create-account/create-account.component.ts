import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/Security/token-storage.service";
import {AuthLoginInfo} from "../../../models/auth-login-info";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  forms!: FormGroup;
  errorMessage: string = '';
  successMessage: boolean = false;
  credentials: AuthLoginInfo = new AuthLoginInfo('','');
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private tokenService: TokenStorageService) {}
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
      next: (data) => {
         this.credentials = {
          email: this.forms.get('email')?.value,
          password: this.forms.get('password')?.value
        }
        if(data) {
          this.successMessage = true;
          setTimeout(() => this.login(), 4000);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
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

  login(): void {
    this.authService.attemptAuth(this.credentials).subscribe(
      response => {
        this.tokenService.saveToken(response.accessToken);
        this.tokenService.saveEmail(response.email);
        this.tokenService.saveAuthorities(response.authorities || []);
      },
      error => {
        this.errorMessage = error.error.message;
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}

export const passwordMatchValidator: Validators = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('password2')?.value)
    return null;
  else
    return {passwordMismatch: true};
};
