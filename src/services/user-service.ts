import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = 'http://localhost:8080/api/user';


  constructor(private http: HttpClient) {}

  getUserByToken(token: string): Observable<User> {
    let params = new HttpParams().set("token", token);
    return this.http.get<User>(`${this.URL}/forgot-password`, {params})
  }

  getUserProfil(): Observable<User> {
    return this.http.get<User>(`${this.URL}/userProfil`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}`, user);
  }

  forgetPassword(password: string) {
    const params = new HttpParams()
      .set('email', password);
    console.log(params)
    return this.http.post<void>(`${this.URL}/forgetPassword`, params);
  }

  updateUser(uuid: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${uuid}`, user);
  }

  updateUserPassword(userUuid: string, password: any) {
    return this.http.patch<User>(`${this.URL}/${userUuid}/reset-password`, password);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.URL}/delete`);
  }
}
