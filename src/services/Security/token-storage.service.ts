import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private cookieSubject$: BehaviorSubject<string> = new BehaviorSubject(this.getEmail());
  public cookie$ = this.cookieSubject$.asObservable();

  constructor(private cookieService: CookieService) {}

  signOut(): void {
    this.cookieService.deleteAll();
    this.cookieSubject$.next('');
  }

  public saveToken(token: string | undefined): void {
    if (typeof token === "string") {
      this.cookieService.set('jwt-token', token);
    }
  }

  public getToken(): string {
    return this.cookieService.get('jwt-token') ?? '';
  }

  public saveEmail(email: string | undefined): void {
    if (email) {
      this.cookieService.set('token-email', email);
      this.cookieSubject$.next(email);
    }
  }

  public getEmail(): string {
    return this.cookieService.get('token-email') ?? '';
  }

  public saveAuthorities(authorities: string[]): void {
    this.cookieService.set('token-authority', JSON.stringify(authorities));
  }
}
