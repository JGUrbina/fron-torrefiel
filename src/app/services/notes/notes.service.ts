import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Notes } from '../../models/notes/notes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private headers: HttpHeaders = new HttpHeaders();
  public urlApi: string;

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {
    this.urlApi = `${UrlApiGlobal}/note`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getNotes(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/${id}`, { headers: this.headers })
  }

  addNotes(id: string, note): Observable<any>{
    console.log("addNote",)
    return this.http.post<any>(`${this.urlApi}/add/${id}`, {note}, { headers: this.headers });
  }

  sendMessage(message: Notes): Observable<any>{
    return this.socket.emit('new-message', message);
  }
}
