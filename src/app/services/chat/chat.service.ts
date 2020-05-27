import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Chat } from '../../models/chat/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

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
