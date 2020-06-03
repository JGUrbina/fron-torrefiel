import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-card-calendar',
  templateUrl: './card-calendar.component.html',
  styleUrls: ['./card-calendar.component.scss']
})
export class CardCalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  public calendarLocale: any;
  public calendarVisible: boolean;
  public calendarPlugins: any[];
  public calendarWeekends: boolean;
  public calendarEvents: EventInput[];

  constructor() {
    this.calendarVisible = true;
    this.calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
    this.calendarWeekends = true;
    this.calendarEvents = [];
    this.calendarLocale = esLocale;
  }

  ngOnInit(): void {
    console.log(new Date());
    this.calendarEvents.push({ title: 'Esto es un evento', date: '2020-05-26' });
    this.calendarEvents.push({ title: 'Prueba', date: '2020-05-08 14:20:00'});
    this.calendarEvents.push({ title: 'Event Now', date: new Date() });
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg: any) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      });
    }
  }

}
