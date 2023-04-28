import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {TokenStorageService} from "../../../services/Security/token-storage.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  constructor(private router: Router, private userService: UserService, private tokenService : TokenStorageService) {
  }

  moveToUserProject() {
    this.router.navigate(['/user/projects']);
  }

  moveToUpdateUserAccount() {
    this.router.navigate(['/user/update']);
  }

  deleteAccount() {
    this.userService.deleteUser().subscribe(next => {
      this.tokenService.signOut();
      this.router.navigate(['/']);
    });
  }
}
