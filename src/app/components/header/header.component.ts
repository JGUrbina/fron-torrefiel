import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeDateService } from '../../services/typeDate/type-date.service';
import { ServiceService } from '../../services/service/service.service';
import { Service } from '../../models/service/service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../models/client/client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public allServices: Service[];
  public allEvents: any[] = [];
  public showCalendar: boolean = false;
  public showNotification: boolean = false;
  public nickName: string;

  constructor(
    private router: Router,
    private typeDateService: TypeDateService,
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.nickName = localStorage.getItem('some-key')==null ? 'nickName' :  JSON.parse(localStorage.getItem('some-key')).name
    
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleCalendar() {
    if(this.showCalendar){
      this.showCalendar = !this.showCalendar;
    }else {
      this.serviceService.getServices().subscribe(
        (data) => {
          console.log('peticion')
          this.allEvents = data.services;
          this.showCalendar = !this.showCalendar;
        },
        (err) => { console.error(err); }
      );
    }
  }

  openNotifications() {
    console.log('notificaciones')
    if(this.showNotification){
      this.showNotification = !this.showNotification;
    }else {
      this.showNotification = !this.showNotification;
      
    }
  }
}
