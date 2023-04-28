import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private role?: string;
  private cookie$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private cookieService: CookieService) { }

  signOut(): void {
    this.cookieService.deleteAll();
    this.cookie$.next('');
  }

  public saveToken(token: string | undefined): void {
    if (typeof token === "string") {
      this.cookieService.set('jwt-token', JSON.stringify(token));
    }
  }

  public getToken(): string {
    return this.cookieService.get('jwt-token') ?? '';
  }

  public saveEmail(email: string | undefined): void {
    if (typeof email === "string" && email != '') {
      this.cookieService.set('token-email', JSON.stringify(email));
      this.cookie$.next(email);
    }
  }

  public getEmail(): string {
    return this.cookieService.get('token-email') ?? '';
  }

  public saveAuthorities(authorities: string[]): void {
    this.cookieService.set('token-authority', JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.role = '';
    const authoritiesString = this.cookieService.get('token-authority');
    if (authoritiesString) {
      JSON.parse(authoritiesString).forEach((authority: string | string[]) => {
        this.role = authority.length > 0 ? authority[0] : '';
      });
    }
    return this.role;
  }

  watchTokenStorage() : Observable<string> {
    return this.cookie$.asObservable();
  }
}
