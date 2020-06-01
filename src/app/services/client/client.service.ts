import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../../models/client/client';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private headers: HttpHeaders = new HttpHeaders();
  public urlApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = `${UrlApiGlobal}/client`;
    this.headers.append('Content-Type', 'application/json');
    /* this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token')); */
    this.headers.append('Authoriztion', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9zw6kgR3Jhc21pbiIsInVzZXJOYW1lIjoiSkdVcmJpbmEiLCJlbWFpbCI6ImoudXJiaW5hLjAxODNAZ21haWwuY29tIiwiaXNWZXJpZnkiOmZhbHNlLCJwaG9uZSI6MTIzNDU2NywiaWF0IjoxNTkxMDI4MTc0LCJleHAiOjE1OTEwNjc3NzR9.tm6PScSo9QnitRRxpKmCjBSJsgEf21mjD1gHeaJYSpE');
  }

  getClients(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  createClient(client: Client): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/register`, client, { headers: this.headers });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  updateClient(id: string): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/update/${id}`, { headers: this.headers });
  }
}
