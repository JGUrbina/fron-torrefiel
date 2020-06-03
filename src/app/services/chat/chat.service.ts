import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Chat } from '../../models/chat/chat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private headers: HttpHeaders = new HttpHeaders();
  public urlApi: string;

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {
    this.urlApi = `${UrlApiGlobal}/chat`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getMessages(): Observable<any>{
    return new Observable((observer: any) => {
      this.socket.on('new-message', (message: any) => {
          observer.next(message);
      });
    });
  }

  sendMessage(message: Chat): Observable<any>{
    return this.socket.emit('new-message', message);
  }
}
