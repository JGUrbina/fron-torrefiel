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
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
  ) {
    this.urlApi = `${UrlApiGlobal}/service`;
    this.headers.append('Content-Type', 'application/json');
    /* this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token')); */
    this.headers.append('Authoriztion', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9zw6kgR3Jhc21pbiIsInVzZXJOYW1lIjoiSkdVcmJpbmEiLCJlbWFpbCI6ImoudXJiaW5hLjAxODNAZ21haWwuY29tIiwiaXNWZXJpZnkiOmZhbHNlLCJwaG9uZSI6MTIzNDU2NywiaWF0IjoxNTkxMDI4MTc0LCJleHAiOjE1OTEwNjc3NzR9.tm6PScSo9QnitRRxpKmCjBSJsgEf21mjD1gHeaJYSpE');
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
