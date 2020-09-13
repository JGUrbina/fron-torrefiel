import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Notes } from '../../models/notes/notes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlApiGlobal } from '../../config/config';
//import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${JSON.parse(localStorage.getItem('some-key')).token}`});
  public urlApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = `${UrlApiGlobal}/history`;
    //this.headers.append('Content-Type', 'application/json');
   // this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getHistoryPerService(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/${id}`, { headers: this.headers })
  }
}
