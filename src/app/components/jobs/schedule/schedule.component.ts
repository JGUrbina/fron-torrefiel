import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceService } from 'src/app/services/service/service.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Output() serviceToJobs: EventEmitter<Service> = new EventEmitter();
  @Input() startService: Date;
  @Input() hourService: any;
  @Input() user: any[];
  @Input() service: any;
  @Input() worker: any;

  public allUsers: User[];
  public newService: Service;
  public allEvents: any;
  public usersAssigned: any[];
  public checkeds: any[];
  public startHours: any;
  public startDate: any;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,

  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.allUsers = [];
    this.checkeds = [];
   }

  ngOnInit(): void {
    this.getAllUser();
    this.startDate = this.dateChange();
    console.log('service oninit', this.service)
  }

  

  dateChange(){
    let Year : any, Month : any, Day : any;

    Year = new Date().getFullYear();
    Month = new Date().getMonth();
    Day = new Date().getDay();
    
    return `${Year}-${Month}-${Day}`;

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
        this.setInputs();
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }
  
  setInputs(){
    this.allUsers.forEach((user, index) => this.checkeds[index] = this.service.workers.includes(user._id) ? true : false)
    this.startDate = this.service.startDate.split('T')[0];
    this.startHours = this.service.startHours;
  };



  scheduleService(){
    let workersIds = []
    
    this.checkeds.forEach((check, index) => check ? workersIds.push(this.allUsers[index]._id) : null);

    if(!this.startDate) this.startDate = this.dateChange();

    if(workersIds.length > 0){
      const id = this.service._id;
      const payload = {
        workers: workersIds,
        startDate: this.startDate,
        startHours: this.startHours
      };
      
      this.serviceService.scheduleService(id, payload)
        .subscribe(data =>{
          console.log('respuesta', data);
          this.serviceToJobs.emit(data.services);
        }, err => console.log('error', err));
    };
  };
};
