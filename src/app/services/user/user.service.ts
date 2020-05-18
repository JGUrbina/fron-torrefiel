import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlApi: string = "http://localhost:5001/user";

  constructor(private _Http: HttpClient) { }

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
