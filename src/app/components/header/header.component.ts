import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TypeDateService } from '../../services/typeDate/type-date.service';
import { ServiceService } from '../../services/service/service.service';
import { Service } from '../../models/service/service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../models/client/client';
import { NotificationComponent } from '../utils/notification/notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //@Input() usuarioSeleccionado;

  @ViewChild(NotificationComponent) child: NotificationComponent;

  public allServices: Service[];
  public allEvents: any[] = [];
  public showCalendar: boolean = false;
  public showNotification: boolean = false;
  public nickName: string;
  public allNotifications: any[];

  constructor(
    private router: Router,
    private typeDateService: TypeDateService,
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,

  ) {
    this.allNotifications = [];
  }

  setSeleccionado(usuario) {
    if(this.allNotifications.length==0){
      this.showNotification = !this.showNotification;
    }
  }
   
  ngOnInit(): void {
    console.log('oninit header');
    this.nickName = localStorage.getItem('some-key')==null ? 'nickName' :  JSON.parse(localStorage.getItem('some-key')).name
    this.serviceService.initSocket();
    this.setId();
    this.Notifications();
    this.getHistory();
  }

  ngOnDestroy(): void {
    console.log('ondestroy header');
    this.serviceService.closeNotification();
  }

  setId(){
    if(localStorage.getItem('some-key')!=null){
      const {userName, _id} = JSON.parse(localStorage.getItem('some-key'))
      this.serviceService.setId({userName, _id});
    } 
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getHistory(){
    this.serviceService.getHistoryNotifications().subscribe(
      data => {
        this.allNotifications = data.filter(notification => notification.seenStatus === false).reverse();
        console.log("allnotifications header", this.allNotifications.length)
      },err=>{console.log("Error", err)}
    );
  }


  Notifications(){
    this.serviceService.Notifications().subscribe(
      data => {
        this.allNotifications.unshift(data);
        console.log("notificaciones", this.allNotifications.length)
      },err=>console.log("Error",err)
    )
  }

  deleteNotification(id){
    const notificationId = this.allNotifications[id]._id;
    this.allNotifications.splice(id, 1);
    this.serviceService.RemoveNotification(notificationId).subscribe(
      data => {
        console.log('respuesta', data);
      }, err => console.log('err', err)
    );
    if(this.allNotifications.length === 0) {
      this.showNotification = !this.showNotification;
    }
  }
  
  toggleCalendar() {
    if(this.showCalendar){
      this.showCalendar = !this.showCalendar;
    }else {
      this.serviceService.getServices().subscribe(
        (data) => {
          console.log('peticion')
          this.allEvents = data.services;
          this.showNotification = false;
          this.showCalendar = !this.showCalendar;
        },
        (err) => { console.error(err); }
      );
    }
  }

  openNotifications() {
    if(this.allNotifications.length > 0) {
      if(this.showNotification){
        this.showNotification = !this.showNotification;
      }else { 
        this.showNotification = !this.showNotification;
        this.showCalendar = false;
      }
    }
  }
}
