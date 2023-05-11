import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {User} from "../../../models/User";
import {TokenStorageService} from "../../../services/Security/token-storage.service";

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit{

  forms!: FormGroup;
  errorMessage:string = '';
  user?: User;
  successMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initData();
  }

  cancel():void {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if(this.user)
      this.userService.updateUser(this.user?.userUuid, this.forms.value).subscribe({
      complete: () => {
        this.successMessage = true;
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        },
      next: () => {
        setTimeout((): void => {
          this.tokenService.signOut();
          this.router.navigate(['/']);
        }, 2000);
    }});
  }

  onPasswordInput(): void {
    if (this.forms.hasError('passwordMismatch'))
      this.forms.get('password2')?.setErrors([{'passwordMismatch': true}]);
    else
      this.forms.get('password2')?.setErrors(null);
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

  private initData() {
    this.userService.getUserProfil().subscribe( data => {
      this.user = data;
      if (this.user) {
        this.patchValue(this.user);
      }
    });
  }

  private patchValue(user: User) {
    this.forms.patchValue({
      email: this.user?.email
    });
  }
}

export const passwordMatchValidator: Validators = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('password2')?.value)
    return null;
  else
    return {passwordMismatch: true};
};

