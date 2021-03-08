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
  public workersIds: any[];
  public config: any;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,

  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.allUsers = []; 
    this.checkeds = [];
    this.workersIds = [];
    this.config = {
      firstDayOfWeek: 'su',
      monthFormat: 'MMM, YYYY',
      disableKeypress: false,
      allowMultiSelect: false,
      closeOnSelect: undefined,
      closeOnSelectDelay: 100,
      onOpenDelay: 0,
      weekDayFormat: 'ddd',
      appendTo: document.body,
      drops: 'down',
      opens: 'right',
      showNearMonthDays: true,
      showWeekNumbers: false,
      enableMonthSelector: true,
      format: "DD-MM-YYYY",
      yearFormat: 'YYYY',
      showGoToCurrent: true,
      dayBtnFormat: 'DD',
      monthBtnFormat: 'MMM',
      hours12Format: 'hh',
      hours24Format: 'HH',
      meridiemFormat: 'A',
      minutesFormat: 'mm',
      minutesInterval: 1,
      secondsFormat: 'ss',
      secondsInterval: 1,
      showSeconds: false,
      showTwentyFourHours: true,
      multipleYearsNavigateBy: 10,
      showMultipleYearsNavigation: false,
      locale: 'es-es',
      // min:'2017-08-29 15:50',
      // minTime:'2017-08-29 15:50'
    }
    this.startDate = this.dateChange()
   }
   

  ngOnInit(): void {
    this.getAllUser();
    //console.log('service oninit', this.service)
    console.log('date oninit', this.startDate)
    this.connectSocket()
  }

  connectSocket(){
    this.serviceService.initSocket();
  }

  dateChange(){
    let Year : any, Month : any, Day : any;

    Year = new Date().getFullYear();
    Month = new Date().getMonth() + 1;
    Day = new Date().getDate();
    
    Day = Day <= 9 ? '0' + Day.toString() : Day;
    Month = Month <= 9 ? '0' + Month : Month;
    //return `${Year}-${Month}-${Day}`;
    return `${Day}-${Month}-${Year}`;
  };

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
    this.startDate = this.startDate == '' ? this.service.startDate.split('T')[0] : ''
    this.startDate = this.startDate == '' ? this.startDate.split('-').reverse().join('-') : ''
    this.startHours = this.service.startHours;
  };



  scheduleService(){

    this.startDate = this.startDate.split('-').reverse().join('-');
    console.log('thisdate', this.startDate)

    this.checkeds.forEach((check, index) => check ? this.workersIds.push(this.allUsers[index]._id) : null);

    if(this.workersIds.length > 0){
      const id = this.service._id;
      const payload = {
        workers: this.workersIds,
        startDate: this.startDate,
        startHours: this.startHours
      };
      
      this.serviceService.scheduleService(id, payload)
        .subscribe(data =>{
          this.serviceService.createNotification(this.workersIds)
          console.log('respuesta', data);
          this.serviceToJobs.emit(data.services);
        }, err => console.log('error', err));
    };

    this.startDate = this.startDate.split('-').reverse().join('-');
  };
};
