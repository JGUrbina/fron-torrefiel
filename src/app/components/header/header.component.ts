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
  public allEvents: any[];
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
        console.log(data);
        this.allServices = data;
        this.setAllEvent(this.allServices);
      },
      (err) => { console.error(err); }
    );
  }

  setAllEvent(services: any): any{
    if (!services) return;

    for (const service of services) {
      console.log(service, '****** service');
      const client: Client = this.getClient(service.client);
      const users: User[] = this.getUser(service.workers);

      console.log(client, 'client', users, 'users');

      for (const user of users) {
        console.log(user.name);
      }
      console.log(users.filter((user) => user.name ? `${user.name} ` : ''));

      const newEvent = {
        title: `${client.name ? client.name : ''} - ${users.map((user) => user.name ? `${user.name} ` : '')}`,
        start: this.typeDateService.generateDate(service.startDate, service.startHours)
      };

      this.allEvents.push(newEvent);
    }

    if (this.allEvents.length > 0){
      this.showCalendar = true;
    }
  }

  getClient(id: any): Client{
    this.clientService.getClient(id).subscribe(
      (data: Client) => console.log(data, '-- client --'),
      (err) => { console.error(err) ; }
    );

    return;
  }

  getUser(users: string[]): User[]{
    if (users.length < 1) return;

    console.log(users, 'userssss');
    const usersOfService: User[] = [];

    for (const user of users) {
      this.userService.getUser(user).subscribe(
        (data: User) => {
          usersOfService.push(data);
        },
        (err) => { console.error(err) ; }
      );
    }

    return usersOfService;
  }
}
