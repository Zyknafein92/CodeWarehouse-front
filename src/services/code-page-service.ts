import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CodePage} from "../models/CodePage";

@Injectable({
  providedIn: 'root'
})
export class CodePageService {

  private URL: string = '/api/project/pages';

  constructor(private http: HttpClient) {
  }

  getCodePage(uuid: string): Observable<CodePage> {
    return this.http.get<CodePage>(`${this.URL}/${uuid}`);
  }

  addCodePage(codePage: CodePage): Observable<CodePage> {
    return this.http.post<CodePage>(`${this.URL}`, codePage);
  }

  updateCodePage(uuid: string, codePage: CodePage): Observable<CodePage> {
    return this.http.put<CodePage>(`${this.URL}/${uuid}`, codePage);
  }

  updateCodePageModificationStatus(uuid: string, status: boolean): Observable<Boolean> {
    return this.http.put<boolean>(`${this.URL}/${uuid}`, status);
  }

  deleteCodePage(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${uuid}`);
  }
}
