import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() events: any;

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
    this.pushInCalendar(this.events);
  }

  pushInCalendar(events: any){
    if (events.length > 1){
      for (const event of events) {
        this.concatEvent(event);
      }
      return;
    }
    this.concatEvent(events);
  }

  concatEvent(input: any){
    this.calendarEvents = this.calendarEvents.concat({
      title: input.title,
      start: input.start,
      allDay: false
    });
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }
}
