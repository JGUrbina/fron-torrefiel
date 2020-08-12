import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Notes } from '../../models/notes/notes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlApiGlobal , SocketConfig } from '../../config/config';


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

  getNotes(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/${id}`, { headers: this.headers })
  }

  addNotes(id: string, note): Observable<any>{
    console.log("addNote",)
    return this.http.post<any>(`${this.urlApi}/add/${id}`, {note}, { headers: this.headers });
  }

  // sendMessage(message: any , user: any): Observable<any>{
  //   return new Observable((observer: any) => {
  //     const msg = {
  //     text: message,
  //       user: {
  //           userName: 'Marina',
  //         //  _id
  //       }
  //     };
  //     this.socket.emit('Chat', msg);
  //     observer.next(msg);
  //   });
  // }

  // newMessage(): Observable<any>{
  //   return new Observable((observer: any) => {
  //   this.socket.on('New message', msg => {
  //     console.log('msg', msg);
  //     observer.next(msg);
  //    // msgHistory.innerHTML += `${msg.user.userName}: ${msg.text}<br>`;
  //   });
  // });
  // }

  // public connectSocket() : void{
  //   this.socket = socketIo(this.urlApi);
  // }

  // public getHistoryChat(): Observable<any> {
  //   return new Observable<any>(observer => {
  //       this.socket.on('Chat history', (data: any) => observer.next(data));
  //   });
  // }

  // getHistoryChat() :void{
  //   this.socket.on('Chat history', data=>{
  //     console.log("history", data)
  //   })
  // }

  // destroyMessage(){
  //     this.socket.disconnect()
  //     //this.socket.emit('forceDisconnect');
  //     console.log("entro a destroy")
    
  // }


  // getHistoryMessage(): Observable<any> {
   
  //    this.socket.once('Chat history', msgs => {
  //     this.mensajes = msgs;
  //  //  msgs.forEach(msg => console.log("mensaje", msg));
  //   })
  //   console.log("mensaje", this.mensajes)
  //   return this.mensajes;
  // }

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