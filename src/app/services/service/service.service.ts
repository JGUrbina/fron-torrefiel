import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/service/service';
import { UrlApiGlobal } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = `${UrlApiGlobal}/service`;
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  updateService(id: string): Observable<any> {
    return this.http.post<object>(`${this.urlApi}/update/${id}`, {id});
  }

  createService(service: Service): Observable<object>{
    const id = service.client;
    return this.http.post<object>(`${this.urlApi}/register/${id}`, {id});
  }

  deleteService(id: string): Observable<object> {
    return this.http.delete<object>(`${this.urlApi}/${id}`);
  }

}
