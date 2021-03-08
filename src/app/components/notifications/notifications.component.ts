import { Component,  Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent { 
  
  @Output() deleteNotificationIndex: EventEmitter<Number> = new EventEmitter();
  @Input() allNotifications: any[];

  public calendarVisible: boolean; 
  public numberNotifications: any;

  constructor(
  ) {
    this.calendarVisible = true;
    this.allNotifications = [];
    this.numberNotifications = '';
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
