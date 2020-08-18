import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../../models/service/service';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 
  private socket
  public urlApi: string;
  public urlNotification: string;
  private headers: HttpHeaders = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('some-key')!=null? JSON.parse(localStorage.getItem('some-key')).token : ' ' }`});
  public userName: any;

  constructor(
    private http: HttpClient,
  ) {
    this.urlApi = `${UrlApiGlobal}/service`;
    this.urlNotification = `${UrlApiGlobal}/notification`;
    this.userName = localStorage.getItem('some-key')!=null? JSON.parse(localStorage.getItem('some-key')).name : ' ' 

  }

  public initSocket(): void {
    console.log('url', UrlApiGlobal);
    this.socket = socketIo(UrlApiGlobal);
  }

  public setId(myInfo): void{
      this.socket.emit('Set Id', myInfo);
     // this.socket.once('Notifications history', (data: any) => observer.next(data));
  };

  createNotification(workers): void{
    console.log("local storage", localStorage.getItem('some-key'))
    //this.userName = localStorage.getItem('some-key')!=null? JSON.parse(localStorage.getItem('some-key')).name : ' ' 
    const notification = { text: `${this.userName} te ha asignado un nuevo servicio`, workers }
    this.socket.emit('Create Notification', notification);
  }

  public getHistoryNotifications(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.once('Notifications History', (data: any) => observer.next(data));
    });
  };

  public Notifications(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('Notification', (data: any) => observer.next(data));
    });
  };

  RemoveNotification(id){
    console.log("id recibido", `${this.urlNotification}/${id}`)
    return this.http.put<object>(`${this.urlNotification}/${id}`, { headers: this.headers });
  }

  editNotifications(numService, workers):void{
    const notification = { text: `${this.userName} ha modificado el servicio ${numService}`, workers }
    this.socket.emit('Create Notification', notification);
    
  }

  getServices(): Observable<any> {
    return this.http.get<any>(this.urlApi, { headers: this.headers });
  }

  updateService(id: string, job): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/update/${id}`, job, { headers: this.headers });
  }

  createService(service: Service, clientId: string): Observable<object>{
    return this.http.post<object>(`${this.urlApi}/register/${clientId}`, service, { headers: this.headers });
  }

  deleteService(id: string): Observable<object> {
    return this.http.delete<object>(`${this.urlApi}/${id}`, { headers: this.headers });
  }

  scheduleService(id: string, schedule: any): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/${id}`, schedule, { headers: this.headers });
  }

  getWorks(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/userServices/${id}`, { headers: this.headers })
  }

  addNote(id: string, note): Observable<any> {
    return this.http.put<object>(`${this.urlApi}/addNote/${id}`, {note}, { headers: this.headers });
  }

  downloadData(year: string, month: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/downloadPdf/${year}${month}`,{responseType: 'arraybuffer' as 'json',headers:this.headers} );
  }

  getImages(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/images/${id}`, { headers: this.headers })
  }

  downloadImages(id: string): Observable<any> {
    return this.http.get<object>(`${this.urlApi}/downloadImages/${id}`,{responseType: 'arraybuffer' as 'json',headers:this.headers} );
  }

  public closeAllConections(): void {
    this.socket.removeAllListeners();
  }

}
