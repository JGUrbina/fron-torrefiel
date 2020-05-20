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

  constructor(private _Http: HttpClient) {
    this.urlApi = `${UrlApiGlobal}/user`;
  }

  getUsers(): Observable<any> {
    return this._Http.get<any>(this.urlApi);
  }

  createUser(user: User): Observable<object>{
    return this._Http.post<object>(`${this.urlApi}/register`, user);
  }

  deleteUser(id: string): Observable<object> {
    return this._Http.delete<object>(`${this.urlApi}/${id}`);
  }

  login(params: object): Observable<object> {
    console.log(params);
    return this._Http.post<object>(`${this.urlApi}/login`, params);
  }

  setPassword(token: string): Observable<object>{
    return this._Http.post<object>(`${this.urlApi}/passwordreset/${token}`, token);
  }

  verifyUser(token: string): Observable<object>{
    return this._Http.get<object>(`${this.urlApi}/confirmation/${token}`);
  }

  sendMailResetPassword(email: string): Observable<object>{
    return this._Http.post<object>(`${this.urlApi}/emailpassreset`, email);
  }
}
