import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private URL: string = '/api/project';

  constructor(private http: HttpClient) {
  }

  getProject(uuid: string): Observable<Project> {
    return this.http.get<Project>(`${this.URL}/${uuid}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.URL}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.URL}`, project);
  }

  updateProject(uuid: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.URL}/${uuid}`, project);
  }

  updateProjectVisibilityStatus(uuid: string, status: boolean): Observable<Boolean> {
    return this.http.put<boolean>(`${this.URL}/${uuid}`, status);
  }

  deleteProject(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  }
}
