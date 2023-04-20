import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {

  constructor(private router: Router) {
  }

  moveToUserProject() {
    this.router.navigate(['/user/projects']);
  }

  moveToUpdateUserAccount() {
    this.router.navigate(['/user/update']);
  }

  deleteAccount() {
    //todo: add confirmation && service appel
  }
}
