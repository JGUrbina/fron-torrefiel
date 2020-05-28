import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Chat } from '../../models/chat/chat';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket,
    private headers: HttpHeaders
  ) {
    /* this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authoriztion', 'Bearer ' + localStorage.getItem('token')); */
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
