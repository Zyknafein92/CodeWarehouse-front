import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private URL: string = '/api/user';

  constructor(private http: HttpClient) {
  }

  getUser(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${uuid}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.URL}`, user);
  }

  updateUser(uuid: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${uuid}`, user);
  }

  deleteUser(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  }
}
