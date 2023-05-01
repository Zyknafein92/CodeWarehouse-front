import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {CreateAccountComponent} from "./pages/create-account/create-account.component";
import {UpdateAccountComponent} from "./pages/update-account/update-account.component";
import {LoginComponent} from "./pages/login/login.component";
import {UserAccountComponent} from "./pages/user-account/user-account.component";
import {ProjectsViewComponent} from "./pages/projects-view/projects-view.component";
import {ProjectEditComponent} from "./pages/project-edit/project-edit.component";
import {PageEditComponent} from "./pages/page-edit/page-edit.component";
import {PagesViewComponent} from "./pages/pages-view/pages-view.component";
import {ProjectsSearchPageComponent} from "./pages/projects-search-page/projects-search-page.component";
import {SharedProjectViewComponent} from "./pages/shared-project-view/shared-project-view.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {PasswordRecoverComponent} from "./pages/password-recover/password-recover.component";
import {AuthGuardService} from "../services/Security/auth-guard.service";


const routes: Routes = [
  /* Route AuthGuard */
  { path: 'user/account',
    component: UserAccountComponent,
    canActivate: [AuthGuardService]},

  { path: 'user/update',
    component: UpdateAccountComponent,
    canActivate: [AuthGuardService]},

  { path: 'user/projects',
    component: ProjectsViewComponent,
    canActivate: [AuthGuardService]},

  { path: 'user/project/edit',
    component: ProjectEditComponent,
    canActivate: [AuthGuardService]},

  { path: 'user/project/edit/:projectUuid',
    component: ProjectEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]},

  { path: 'user/project/:projectUuid/pages',
    component: PagesViewComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]},

  { path: 'user/project/:projectUuid/page/edit',
    component: PageEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]},

  { path: 'user/project/:projectUuid/page/edit/:codePageUuid',
    component: PageEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]},

  /* Route non nécessairement log */
  { path: 'project/view/:projectUuid',
    component: SharedProjectViewComponent,
    pathMatch: 'full'},
  { path: 'project/search', component: ProjectsSearchPageComponent},
  { path: 'user/create', component: CreateAccountComponent},
  { path: 'user/forgot-password', component: ForgotPasswordComponent},
  { path: 'user/password-recover', component: PasswordRecoverComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
