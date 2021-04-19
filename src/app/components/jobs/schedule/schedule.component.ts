import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceService } from 'src/app/services/service/service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Output() serviceToJobs: EventEmitter<Service> = new EventEmitter();
  @Input() user: any[];
  @Input() service: Service;
  @Input() worker: any;

  public allUsers: User[];
  public newService: Service;
  public allEvents: any;
  public usersAssigned: any[];
  public checkeds: any[];
  public startHours: any;
  public startDate: any;
  public endHours: any;
  public endDate: any;
  public workersIds: any[];
  public config: any;
  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 2500;

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,

  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
      // minDate: new Date().toLocaleDateString(),
      // min: new Date().toLocaleDateString(),
      // minTime:'2017-08-29 15:50'
    }
   }
   

  ngOnInit(): void {
    this.getAllUser();
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
    this.allUsers.forEach((user, index) => this.checkeds[index] = this.service.workers.includes(user._id) ? true : false);
    this.startHours = this.service.startHours;
    this.endHours = this.service.endHours;
    this.startDate = this.service.startDate === '' || !this.service.startDate ? '' : this.service.startDate.split('T')[0].split('-').reverse().join('-');
    this.endDate = this.service.endDate === '' || !this.service.endDate ? '' : this.service.endDate.split('T')[0].split('-').reverse().join('-');
  };/*  */

  showAlert(urlIcon: string, header: string, title: string, subtitle: string, cb: any){
    this.alertUrlIcon = urlIcon;
    this.alertHeader = header;
    this.alertTitle = title;
    this.alertSubtitle = subtitle;
    this.alertShow = true;

    setTimeout(() => {
      this.alertShow = false;
      cb();
    }, this.ALERTTIMESHOW);
  }

  scheduleService(){

    this.checkeds.forEach((check, index) => check ? this.workersIds.push(this.allUsers[index]._id) : null);
    const invalidDates = new Date(this.startDate.split('-').reverse().join('-')).getTime() > new Date(this.endDate.split('-').reverse().join('-')).getTime();
    const sameDates = new Date(this.startDate.split('-').reverse().join('-')).getTime() === new Date(this.endDate.split('-').reverse().join('-')).getTime();
    const invalidHours = sameDates && (parseInt(this.endHours.replace(':', '')) <= parseInt(this.startHours.replace(':', '')));
    console.log('1', parseInt(this.endHours.replace(':', '')), '2', parseInt(this.startHours.replace(':', ''))); 
    if(invalidDates){
      const urlIcon = '';
      const header = `Error`;
      const title = "La fecha de inicio debe ser anterior que la final";
      const subtitle = '';
      this.showAlert(urlIcon, header, title, subtitle, ()=>{});
      return;
   }else{
     if(invalidHours){
      const urlIcon = '';
      const header = `Error`;
      const title = "La hora de inicio debe ser menor que la hora final";
      const subtitle = '';
      this.showAlert(urlIcon, header, title, subtitle, ()=>{});
      return;
     }else {
      if(this.workersIds.length > 0){
        const id = this.service._id;
        const payload = {
          workers: this.workersIds,
          startDate: this.startDate.split('-').reverse().join('-'),
          startHours: this.startHours,
          endDate: this.endDate.split('-').reverse().join('-'),
          endHours: this.endHours
        };
        
        this.serviceService.scheduleService(id, payload)
          .subscribe(data =>{
            this.serviceService.createNotification(this.workersIds);
            this.serviceToJobs.emit(data.services);
            const urlIcon = '../../../assets/svg_2/ok.svg';
            const header = `Servicio agendado`;
            const title = '¡Servicio agendado exitosamente!';
            const subtitle = '';
            this.showAlert(urlIcon, header, title, subtitle, () => this.emitEvent());
          }, err => console.log('error', err));
      };
     }
   };
  };
};
