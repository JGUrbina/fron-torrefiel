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

  createUser(user: User): Observable<any>{
    return this._Http.post<any>(`${this.urlApi}/register`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this._Http.delete<any>(`${this.urlApi}/${id}`);
  }
}
