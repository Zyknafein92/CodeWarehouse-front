import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ValidationButtonComponent} from './components/validation-button/validation-button.component';
import {LittleButtonComponent} from './components/little-button/little-button.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {UpdateAccountComponent} from './pages/update-account/update-account.component';
import {CreateAccountComponent} from './pages/create-account/create-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {UserAccountComponent} from './pages/user-account/user-account.component';
import {AccountButtonComponent} from './components/account-button/account-button.component';
import {ProjectsViewComponent} from './pages/projects-view/projects-view.component';
import {PagesViewComponent} from './pages/pages-view/pages-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProjectEditComponent} from './pages/project-edit/project-edit.component';
import {PageEditComponent} from './pages/page-edit/page-edit.component';
import {MatRadioModule} from "@angular/material/radio";
import {ProjectsSearchPageComponent} from './pages/projects-search-page/projects-search-page.component';
import {SharedProjectViewComponent} from './pages/shared-project-view/shared-project-view.component';
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AutosizeModule} from "ngx-autosize";
import {CookieService} from 'ngx-cookie-service';
import {httpInterceptorProviders} from "../services/Security/auth-interceptor.service";
import { PasswordRecoverComponent } from './pages/password-recover/password-recover.component';


@NgModule({
  declarations: [
    AppComponent,
    ValidationButtonComponent,
    LittleButtonComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UpdateAccountComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    UserAccountComponent,
    AccountButtonComponent,
    ProjectsViewComponent,
    PagesViewComponent,
    ProjectEditComponent,
    PageEditComponent,
    ProjectsSearchPageComponent,
    SharedProjectViewComponent,
    PasswordRecoverComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    CodemirrorModule,
    MatInputModule,
    MatSelectModule,
    AutosizeModule,
  ],
  providers: [HttpClient, CookieService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
