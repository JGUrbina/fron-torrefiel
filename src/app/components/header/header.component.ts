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

  constructor(
    private router: Router,
    private typeDateService: TypeDateService,
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAllService() {
    this.serviceService.getServices().subscribe(
      (data) => {
        this.allServices = data;
        this.setAllEvent(this.allServices);
      },
      (err) => { console.error(err); }
    );
  }

  setAllEvent(services: any): any{
    if (!services) return;

    for (const service of services) {

      this.clientService.getClient(service.client).subscribe(
        (data: Client) => {
          const newEvent = {
            title: data.name,
            start: this.typeDateService.generateDate(service.startDate, service.startHours),
          };

          this.allEvents.push(newEvent);
        },
        (err) => { console.error(err); }
      );
    }

    this.showCalendar = !this.showCalendar;
  }
}
