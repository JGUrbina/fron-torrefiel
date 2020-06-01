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
    /* this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token')); */
    this.headers.append('Authoriztion', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9zw6kgR3Jhc21pbiIsInVzZXJOYW1lIjoiSkdVcmJpbmEiLCJlbWFpbCI6ImoudXJiaW5hLjAxODNAZ21haWwuY29tIiwiaXNWZXJpZnkiOmZhbHNlLCJwaG9uZSI6MTIzNDU2NywiaWF0IjoxNTkxMDI4MTc0LCJleHAiOjE1OTEwNjc3NzR9.tm6PScSo9QnitRRxpKmCjBSJsgEf21mjD1gHeaJYSpE');
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
