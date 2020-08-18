import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user/user';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('some-key')!=null? JSON.parse(localStorage.getItem('some-key')).token : ' ' }`});
  public urlApi: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlApi = `${UrlApiGlobal}/user`;
  
  }

  getUsers(): Observable<any> {
    console.log("headers", this.headers)
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  createUser(user: User): Observable<any>{
    return this.http.post<any>(`${this.urlApi}/register`, user, { headers: this.headers });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  updateClient(id: string): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/update/${id}`, { headers: this.headers });
  }

  updateUser(id: string, user: User): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/update/${id}`, user, { headers: this.headers });
  }

  login(params: object): Observable<any> {
    console.log("local Storage", localStorage.getItem('some-key'))
    return this.http.post<any>(`${this.urlApi}/login`, params);
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
