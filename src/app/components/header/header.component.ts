import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/Security/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenEmail: string | null  = null;
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.tokenStorageService.watchTokenStorage().subscribe(val => {
      this.tokenEmail = val;
    })
  }

  moveToHomePage() {
    this.router.navigate(['/home']);
  }

  /* User LoggedIn */
  moveToAccountPage(): void {
    this.router.navigate(['/user/account']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }

  /* User not LoggedIn */
  login(): void {
    this.router.navigate(['/login']);
  }
}
