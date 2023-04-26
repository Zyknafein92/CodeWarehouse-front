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


const routes: Routes = [
  /* Route AuthGuard */
  { path: 'user/account', component: UserAccountComponent},
  { path: 'user/update', component: UpdateAccountComponent},
  { path: 'user/projects', component: ProjectsViewComponent},
  { path: 'user/project/edit', component: ProjectEditComponent},
  { path: 'user/project/edit/:projectUuid', component: ProjectEditComponent, pathMatch: 'full'},
  { path: 'user/project/:projectUuid/pages', component: PagesViewComponent, pathMatch: 'full'},
  { path: 'user/project/:projectUuid/page/edit', component: PageEditComponent,  pathMatch: 'full'},
  { path: 'user/project/:projectUuid/page/edit/:codePageUuid', component: PageEditComponent, pathMatch: 'full'},

  /* Route non nécessairement log */
  { path: 'project/view/:projectUuid', component: SharedProjectViewComponent, pathMatch: 'full'},
  { path: 'project/search', component: ProjectsSearchPageComponent},
  { path: 'user/create', component: CreateAccountComponent},
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
