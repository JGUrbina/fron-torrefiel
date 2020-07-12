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
  @Input() events: any[];

  public calendarLocale: any;
  public calendarVisible: boolean;
  public calendarPlugins: any[];
  public calendarWeekends: boolean;
  public calendarEvents: EventInput[];

  public showEvent: boolean = false;
  public user: string;
  public client: string;
  public description: string;

  constructor() {
    this.calendarVisible = true;
    this.calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
    this.calendarWeekends = true;
    this.calendarEvents = [];
    this.calendarLocale = esLocale;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pushInCalendar(this.events);
    }, 200);
  }

  pushInCalendar(events: any[]){
    if (events. length > 1){
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < events.length; i++) {
        const element = events[i];
        this.concatEvent(element);
      }
    }
    this.concatEvent(events);
  }

  concatEvent(input: any){
    this.calendarEvents = this.calendarEvents.concat({
      title: input.title,
      start: input.start,
      allDay: false,
    });

    if (input.data){
      this.user = input.data.user;
      this.client = input.title;
      this.description = input.data.description;
    }
  }

  changeShowEvent(event){
    const element = event.jsEvent.srcElement.innerText;
    this.showEvent = !this.showEvent;
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }
}
