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

  constructor(
    private userService: UserService
  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.allUsers = [];
   }

  ngOnInit(): void {
    this.getAllUser();
    console.log('asignados', this.getUserById(this.service.workers));
  }

  getUserById(idsWorkers){
    let workers = []
    idsWorkers.forEach(id =>{
      workers.push(this.worker.filter(worker => worker._id === id)[0].userName)
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
        console.log('datausers', data)
        this.allUsers = data;
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }

  scheduleService(): void{
    
  }

}
