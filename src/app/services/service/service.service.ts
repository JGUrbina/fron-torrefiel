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
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  updateService(id: string, job): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/update/${id}`, job, { headers: this.headers });
  }

  createService(service: Service, clientId: string): Observable<object>{
    return this.http.post<object>(`${this.urlApi}/register/${clientId}`, service, { headers: this.headers });
  }

  deleteService(id: string): Observable<object> {
    return this.http.delete<object>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  scheduleService(id: string, schedule: any): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/${id}`, schedule, { headers: this.headers });
  }

  getWorks(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/userServices/${id}`, { headers: this.headers })
  }

  addNote(id: string, note): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/addNote/${id}`, {note}, { headers: this.headers });
  }
}
