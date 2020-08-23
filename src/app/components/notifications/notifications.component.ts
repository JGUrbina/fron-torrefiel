import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { User } from 'src/app/models/user/user';
import { Service } from 'src/app/models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';
import * as moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit { 
  
  @Output() newNotification = new EventEmitter<any>();
  @Output() deleteOneNotification = new EventEmitter<any>();

  @Output() usuarioSeleccionado: EventEmitter<Number> = new EventEmitter();
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Input() events: any[];

  public calendarLocale: any;
  public calendarVisible: boolean; 
  public calendarPlugins: any[];
  public calendarWeekends: boolean;
  public calendarEvents: EventInput[];

  public showEvent: boolean = false;
  public selectedEvent: Service;
  public allWorkers: [User];
  public allNotifications: any[];
  public numberNotifications: any;


  constructor(
    private userService: UserService,
    private serviceService: ServiceService
  ) {
    this.calendarVisible = true;
    this.calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
    this.calendarWeekends = true;
    this.calendarEvents = [];
    this.calendarLocale = esLocale;
    this.allNotifications = [];
    this.numberNotifications = '';

  }

  ngOnInit(): void {
    this.getAllWorkers();
    this.serviceService.initSocket();
    this.setId();
    this.Notifications();
    this.getHistory();
  }

  setFecha(createdAt){
    return moment(new Date(createdAt)).fromNow()
  }

  onUsuarioSeleccionado(usuario) {
    this.usuarioSeleccionado.emit(usuario);
  }

  setId(){
    if(localStorage.getItem('some-key')!=null){
      const {userName, _id} = JSON.parse(localStorage.getItem('some-key'))
      this.serviceService.setId({userName, _id});
    } 
  }

 


  getHistory(){
    //console.log("entro a getHistory")
    this.serviceService.getHistoryNotifications().subscribe(
      data => {
        this.allNotifications = data.filter(notification => notification.seenStatus === false)
        this.numberNotifications = this.allNotifications.length;
        //console.log("numero ", this.numberNotifications)
        //this.onUsuarioSeleccionado(this.numberNotifications)
        console.log("allNotifications notifications", this.allNotifications.length)
      },err=>{console.log("Error", err)}
    );
  }

  deleteNotification(id){
    //console.log("index", id)
    let noti = this.allNotifications.splice(id, 1)
    if(this.allNotifications.length < 1){
      this.calendarVisible = false
    }
    this.onUsuarioSeleccionado(this.allNotifications.length)
    this.serviceService.RemoveNotification(noti[0]._id).subscribe(
      data => {
        console.log("Se eliminó correctamente");
        this.deleteOneNotification.emit(id);
      },err => console.log("Error", err)
    )
  }

  Notifications(){
    this.serviceService.Notifications().subscribe(
      data => {
        this.allNotifications.push(data);
        this.onUsuarioSeleccionado(this.allNotifications.length);
        this.newNotification.emit(data);
      },err=>console.log("Error",err)
    )
  }
  
  changeShowEvent(event){
    this.showEvent = !this.showEvent;
    const id = event.event.id;
    const eventFiltered = this.events.filter(event => event._id === id);
    this.selectedEvent = eventFiltered[0];
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  getAllWorkers() {
    this.userService.getUsers().subscribe(
      data => {
        this.allWorkers = data;
        this.showEvents();
      }, err => console.log('err', err));
  }

  showEvents() {
    this.allWorkers.forEach(worker => {
      this.events.forEach(event => {
        if(worker.works.includes(event._id)){
          const start = event.startDate.split('T')[0];
          //console.log("Start",start)
          let { _id: id, name: title, startHours } = event;
          title = startHours;
          title += ` ${worker.name}`;
          const color = worker.color;
          const calEvent = [{ id, start, title, color, startHours }];
          //this.calendarEvents.push(calEvent); //no funciona así, ni con push de object :(
          this.calendarEvents = this.calendarEvents.concat(calEvent);
        };
      });
    });
    this.calendarEvents.sort((a, b) => a.startHours.localeCompare(b.startHours));
    //console.log('eventos1', this.calendarEvents);
  }

}
