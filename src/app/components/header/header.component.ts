import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/Security/token-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tokenEmail: string | undefined;
  $observable: Subscription = new Subscription();

  constructor(private router: Router, private tokenStorageService: TokenStorageService, ) {
  }

  ngOnInit(): void {
  this.tokenStorageService.watchTokenStorage().subscribe(val => {
      this.tokenEmail = val;
    });
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
    this.tokenEmail = '';
    this.router.navigate(['/home']);
  }

  /* User not LoggedIn */
  login(): void {
      this.router.navigate(['/login']);
  }
}
