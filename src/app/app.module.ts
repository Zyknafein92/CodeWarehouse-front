import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ValidationButtonComponent } from './components/validation-button/validation-button.component';
import { LittleButtonComponent } from './components/little-button/little-button.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterOutlet} from "@angular/router";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { UpdateAccountComponent } from './pages/update-account/update-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';

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
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
