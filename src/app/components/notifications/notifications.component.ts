import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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

export class NotificationsComponent implements OnInit, OnDestroy { 
  

  @Output() deleteNotificationIndex: EventEmitter<Number> = new EventEmitter();
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Input() events: any[];
  @Input() allNotifications: any[];

  public calendarLocale: any;
  public calendarVisible: boolean; 
  public calendarPlugins: any[];
  public calendarWeekends: boolean;
  public calendarEvents: EventInput[];

  public showEvent: boolean = false;
  public selectedEvent: Service;
  public allWorkers: [User];
  public numberNotifications: any;


  constructor(
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
    console.log('oninit notif');
  }

  ngOnDestroy(): void {
    console.log('ondestroy notif');
  }

  setFecha(createdAt){
    return moment(new Date(createdAt)).fromNow()
  }


  deleteNotification(id){
    this.deleteNotificationIndex.emit(id);
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
}
