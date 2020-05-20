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

  createUser(user: User): Observable<object>{
    return this.http.post<object>(`${this.urlApi}/register`, user);
  }

  deleteUser(id: string): Observable<object> {
    return this.http.delete<object>(`${this.urlApi}/${id}`);
  }

  login(params: object): Observable<object> {
    console.log(params);
    return this.http.post<object>(`${this.urlApi}/login`, params);
  }

  setPassword(token: string, password: string): Observable<object>{
    return this.http.post<object>(`${this.urlApi}/passwordreset/${token}`, {password});
  }

  verifyUser(token: string): Observable<object>{
    return this.http.get<object>(`${this.urlApi}/confirmation/${token}`);
  }

  sendMailResetPassword(params: any): Observable<object>{
    return this.http.post<object>(`${this.urlApi}/emailpassreset`, params);
  }
}
