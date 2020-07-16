import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() startService: Date;
  @Input() hourService: any;
  @Input() user: any[];
  @Input() service: any;
  @Input() worker: any;

  public allUsers: User[];
  public newService: Service;
  public allEvents: any;
  public usersAssigned: any[];

  constructor(
    private userService: UserService
  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.allUsers = [];
   }

  ngOnInit(): void {
    this.getAllUser();
  }

  getUserById(idsWorkers){
    let workers = []
    idsWorkers.forEach(id => {
      const filteredUser = this.allUsers.filter(user => user._id === id)[0];
      console.log('filtered', filteredUser.name);
    })
    return workers;
  }

  dateChange(){
  };

  generateDate(fecha: any, hour: any): string{
    fecha = fecha.toString().slice(0, 10);
    fecha += ` ${hour}`;

    return fecha;
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

  getAllUser(): void{
    this.userService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        console.log('datausers', this.allUsers)
        this.service.workers ? this.getUserById(this.service.workers) : null;
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }

  scheduleService(): void{
    console.log('this', this);
  }

}
