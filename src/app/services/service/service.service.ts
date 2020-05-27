import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/service/service';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public urlApi: string;

  constructor(
    private http: HttpClient,
    private headers: HttpHeaders
  ) {
    this.urlApi = `${UrlApiGlobal}/service`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token'));
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  updateService(id: string): Observable<any> {
    return this.http.post<object>(`${this.urlApi}/update/${id}`, {id}, { headers: this.headers });
  }

  createService(service: Service): Observable<object>{
    const id = service.client;
    return this.http.post<object>(`${this.urlApi}/register/${id}`, {id}, { headers: this.headers });
  }

  deleteService(id: string): Observable<object> {
    return this.http.delete<object>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

}
