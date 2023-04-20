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


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user/create', component: CreateAccountComponent},
  { path: 'user/account', component: UserAccountComponent},
  { path: 'user/update', component: UpdateAccountComponent},
  { path: 'user/projects', component: ProjectsViewComponent},
  { path: 'project/edit', component: ProjectEditComponent},

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
