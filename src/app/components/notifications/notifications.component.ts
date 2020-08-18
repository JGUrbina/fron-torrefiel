import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit, ViewChild, Input , OnDestroy} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { User } from 'src/app/models/user/user';
import { Service } from 'src/app/models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})


export class NotificationsComponent implements OnInit, OnDestroy { 
  
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
    this.Notifications();
    this.setId();
    this.getHistory();
    
  }

  ngOnDestroy(): void{
    this.serviceService.closeAllConections();
    console.log("Notification destroy" )
  }

  setId(){
    if(localStorage.getItem('some-key')!=null){
      const {userName, _id} = JSON.parse(localStorage.getItem('some-key'))
      this.serviceService.setId({userName, _id});
    } 
  }

  getHistory(){
    console.log("entro a getHistory")
    this.serviceService.getHistoryNotifications().subscribe(
      data => {
        this.allNotifications = data.filter(notification => notification.seenStatus === false)
        this.numberNotifications = this.allNotifications.length;
        console.log("numero ", this.numberNotifications)
        console.log("allNotifications", this.allNotifications)
      },err=>{console.log("Error", err)}
    );
  }

  deleteNotification(id){
    console.log("index", id)
    let noti = this.allNotifications.splice(id, 1)
    console.log("noti", typeof(noti[0]._id))
    this.serviceService.RemoveNotification(noti[0]._id).subscribe(
      data => {console.log("Se eliminó correctamente") },err => console.log("Error", err)
    )
    //this.allNotifications.splice(id, 1)
  }

  Notifications(){
    this.serviceService.Notifications().subscribe(
      data => {
        this.allNotifications.push(data);
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
          console.log("Start",start)
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
    console.log('eventos1', this.calendarEvents);
  }

}
