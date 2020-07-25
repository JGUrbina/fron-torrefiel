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
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getClients(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  getClient(id: string): Promise<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`, { headers: this.headers }).toPromise();
  }

  createClient(client: Client): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/register`, client, { headers: this.headers });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  updateClient(id: string, client: Client): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/update/${id}`, client, { headers: this.headers });
  }

  getServices(id: string): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/${id}/services`, { headers: this.headers});
  }
}
