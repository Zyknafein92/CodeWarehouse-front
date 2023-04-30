import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.css']
})
export class PasswordRecoverComponent implements OnInit{

  forms!: FormGroup;
  user?: User;
  token: string | undefined;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.token = param['token'];
      console.log('token: ', this.token)
      this.initializeForm();
      this.initUser();
    });
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]
        )),
        password2: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]))
      }, {validators: passwordMatchValidator}
    )
  }

  private initUser() : void {
    if(this.token) {
      this.userService.getUserByToken(this.token).subscribe( data => {
        console.log(data);
        this.user = data;
      });
    }
  }

  onSubmit() {
    if(this.user) {
      this.userService.updateUserPassword(this.user?.userUuid, this.forms.get('password')?.value).subscribe(next => {
        this.router.navigate(['/login']);
      });
    }
  }

  cancel() {
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
