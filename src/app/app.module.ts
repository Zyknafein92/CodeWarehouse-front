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
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
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
import { ProjectsSearchPageComponent } from './pages/projects-search-page/projects-search-page.component';

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
    ForgetPasswordComponent,
    UserAccountComponent,
    AccountButtonComponent,
    ProjectsViewComponent,
    PagesViewComponent,
    ProjectEditComponent,
    PageEditComponent,
    ProjectsSearchPageComponent
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
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
