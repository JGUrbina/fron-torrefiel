import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user/user';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders = new HttpHeaders();
  public urlApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = `${UrlApiGlobal}/user`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token'));
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  createUser(user: User): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/register`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  updateClient(id: string): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/update/${id}`, { headers: this.headers });
  }

  login(params: object): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/login`, params, { headers: this.headers });
  }

  setPassword(token: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/passwordreset/${token}`, {password}, { headers: this.headers });
  }

  verifyUser(token: string): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/confirmation/${token}`, { headers: this.headers });
  }

  sendMailResetPassword(params: any): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/emailpassreset`, params);
  }
}
