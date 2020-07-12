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
  public showCalendar: boolean = true;
  public contador: number = 0;

  constructor(
    private router: Router,
    private typeDateService: TypeDateService,
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.getAllService();
  }

  closeSession(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAllService() {
    this.serviceService.getServices().subscribe(
      (data) => {
        /* console.log('en funcion');
        console.log(localStorage.getItem('services'));
        if (localStorage.getItem('services') === null || localStorage.getItem('services') !== data){
          console.log('en el if');
          localStorage.setItem('services', data.toString());
          this.setAllEvent(data);
        } */

        if (this.contador === 0){
          console.log('en contador');
          this.setAllEvent(data);
          this.contador += 1;
        }

        console.log('fuera de if');

        this.showCalendar = !this.showCalendar;
      },
      (err) => { console.error(err); }
    );
  }

  async setAllEvent(services: any): Promise<any>{
    if (!services) return;

    console.log('ANtes del for');

    for (const service of services) {

      const client = await this.clientService.getClient(service.client);

      const newEvent = {
        title: client.name,
        start: this.typeDateService.generateDate(service.startDate, service.startHours),
      };

      this.allEvents.push(newEvent);
      console.log(this.allEvents);

    }

    console.log('salio del for');
  }
}
