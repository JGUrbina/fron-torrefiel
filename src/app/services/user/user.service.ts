import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user/user';
import { UrlApiGlobal } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = `${UrlApiGlobal}/user`;
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  createUser(user: User): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/register`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  login(params: object): Observable<any> {
    console.log(params);
    return this.http.post<any>(`${this.urlApi}/login`, params);
  }

  setPassword(token: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/passwordreset/${token}`, {password});
  }

  verifyUser(token: string): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/confirmation/${token}`);
  }

  sendMailResetPassword(params: any): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/emailpassreset`, params);
  }
}
