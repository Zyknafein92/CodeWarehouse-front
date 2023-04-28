import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private cookie$: BehaviorSubject<string> = new BehaviorSubject(this.getEmail());

  constructor(private cookieService: CookieService) {}

  signOut(): void {
    this.cookieService.deleteAll();
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
      this.cookie$.next(email);
    }
  }

  public getEmail(): string {
    return this.cookieService.get('token-email') ?? '';
  }

  public saveAuthorities(authorities: string[]): void {
    this.cookieService.set('token-authority', JSON.stringify(authorities));
  }

  watchTokenStorage() : Observable<string> {
    return this.cookie$.asObservable();
  }
}
