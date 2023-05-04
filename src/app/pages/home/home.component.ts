import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/Security/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
   tokenEmail: string = '';

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.tokenStorageService.cookie$.subscribe(val => {
      this.tokenEmail = val;
    });
  }
  moveToSignInPage() {
    this.router.navigate(['/user/create']);
  }

  moveToSearchPage() {
    this.router.navigate(['/project/search']);
  }


}
