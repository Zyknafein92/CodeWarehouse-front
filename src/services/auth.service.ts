import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthLoginInfo} from "../models/auth-login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "./Security/JwtReponse";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {}

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.URL, credentials, httpOptions);
  }
}
