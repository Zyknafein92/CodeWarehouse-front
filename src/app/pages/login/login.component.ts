import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../services/Security/token-storage.service";
import {Router} from "@angular/router";
import {AuthLoginInfo} from "../../../models/auth-login-info";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forms!: FormGroup;
  private loginInfo!: AuthLoginInfo;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private authService: AuthService) {
  }
  ngOnInit(): void {
    this.initToken();
    this.initializeForm();
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/']);
    }
  }

  private initToken() {
    this.tokenStorage.getToken();
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    )
  }
  onSubmit(): void {
    console.log(this.forms);

    this.loginInfo = new AuthLoginInfo(
      this.forms.getRawValue().email,
      this.forms.getRawValue().password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      response => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveEmail(response.email);
        this.tokenStorage.saveAuthorities(response.authorities || []);
      },
      error => {
        this.errorMessage = error.error.message;
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  moveToHome() {
    this.router.navigate(['/']);
  }
}
