import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlApiGlobal  } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class ChatService { 

  private socket
  private headers: HttpHeaders = new HttpHeaders();
  public urlApi: string;
  public mensajes: any[];

  constructor(
    private http: HttpClient,

  ) {
    this.urlApi = `${UrlApiGlobal}/note`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  public initSocket(): void {
    console.log('url', UrlApiGlobal);
    this.socket = socketIo(UrlApiGlobal);
  }

  public getHistory(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.once('Chat history', (data: any) => observer.next(data));
    });
  };

  public sendMessage(message: any): void {
    console.log('send message', message);
    this.socket.emit('Chat', message);
  };

  public getMessage(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('New message', msg => observer.next(msg));
    });
}

  public closeAllConections(): void {
    this.socket.removeAllListeners();
  };

};