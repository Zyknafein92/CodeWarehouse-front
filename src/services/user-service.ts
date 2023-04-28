import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = 'http://localhost:8080/api/user';


  constructor(private http: HttpClient) {}

  getUser(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${uuid}`);
  }

  getUserProfil(): Observable<User> {
    return this.http.get<User>(`${this.URL}/userProfil`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}`, user);
  }

  updateUser(uuid: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${uuid}`, user);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.URL}/delete`);
  }
}
