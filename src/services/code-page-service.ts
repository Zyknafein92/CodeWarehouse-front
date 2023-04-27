import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CodePage} from "../models/CodePage";

@Injectable({
  providedIn: 'root'
})
export class CodePageService {

  private URL: string = 'http://localhost:8080/api/pages';

  constructor(private http: HttpClient) {
  }

  getCodePage(uuid: string): Observable<CodePage> {
    return this.http.get<CodePage>(`${this.URL}/${uuid}`);
  }

  getAllProjectPages(uuid: string, pageNumber: number, pageSize: number, sort: any): Observable<CodePage[]> {
    const params: HttpParams = new HttpParams();
    params.set('pageNumber', pageNumber);
    params.set('pageSize', pageSize);
    params.set('sort', sort);
    return this.http.post<CodePage[]>(`http://localhost:8080/api/project/${uuid}/pages`, { params } );
  }

  addCodePage(codePage: CodePage): Observable<CodePage> {
    return this.http.post<CodePage>(`${this.URL}`, codePage);
  }

  updateCodePage(uuid: string, codePage: CodePage): Observable<CodePage> {
    return this.http.put<CodePage>(`${this.URL}/${uuid}`, codePage);
  }

  updateCodePageModificationStatus(uuid: string, status: boolean): Observable<Boolean> {
    return this.http.patch<boolean>(`${this.URL}/${uuid}/status`, status);
  }

  deleteCodePage(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  }
}
