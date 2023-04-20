import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedIn: boolean = true;
  constructor(private router: Router) {
  }


  moveToHomePage() {
    this.router.navigate(['/home']);
  }

  /* User LoggedIn */
  moveToAccountPage(): void {
    //todo : check login security
    this.router.navigate(['/user/account']);
  }

  disconnectUser(): void {
    //todo: disconnect user
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  /* User not LoggedIn */
  login(): void {
    this.loggedIn = true;
    this.router.navigate(['/login']);
  }

}
