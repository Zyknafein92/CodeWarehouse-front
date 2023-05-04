import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL: string = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {
  }

  getProject(uuid: string): Observable<Project> {
    return this.http.get<Project>(`${this.URL}/${uuid}`);
  }

  getAllProjects(pageNumber: number, pageSize: number): Observable<Project[]> {
    const params: HttpParams = new HttpParams();
    params.set('page', pageNumber);
    params.set('size', pageSize);
    return this.http.get<Project[]>(`${this.URL}`, { params });
  }

  getAllProjectOfUser(pageNumber: number, pageSize: number): Observable<Project[]> {
    const params: HttpParams = new HttpParams();
    params.set('page', pageNumber);
    params.set('size', pageSize);
    return this.http.get<Project[]>(`${this.URL + '/user'}`, { params });
  }
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.URL}`, project);
  }

  updateProject(uuid: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.URL}/${uuid}`, project);
  }

  deleteProject(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  }
}
