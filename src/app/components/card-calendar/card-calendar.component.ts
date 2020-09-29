import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import {
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-card-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['card-calendar.component.scss'],
  templateUrl: 'card-calendar.component.html',
})
export class CardCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() eventsInput: any[];

  public allWorkers: [User];

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getAllWorkers();
  }

  getAllWorkers() {
    this.userService.getUsers().subscribe(
      data => {
        this.allWorkers = data;
        this.setEvents();
        console.log('this all workers', this.allWorkers);
      }, err => console.log('err', err));
  }

  setEvents() {
    this.allWorkers.forEach(worker => {
      worker.works.forEach(work => {
        console.log('worker', worker);
        const tmpService = this.eventsInput.filter(event => event._id === work)[0];
        const tmpHours = Number(tmpService.startHours.split(':')[0]);
        const tmpEvent = {
          start: addHours(new Date(tmpService.startDate.replace('.000Z', '')), tmpHours),
          title: `${tmpService.startHours} ${worker.name}`,
          color: { primary: '#cd2a00;', secondary: worker.color }
        }
        this.events.push(tmpEvent);
      });
    });
    this.refresh.next()
  };

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}









//import { UserService } from 'src/app/services/user/user.service';
// import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { FullCalendarComponent } from '@fullcalendar/angular';
// import { EventInput } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGrigPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import esLocale from '@fullcalendar/core/locales/es';
// import { User } from 'src/app/models/user/user';
// import { Service } from 'src/app/models/service/service';

// @Component({
//   selector: 'app-card-calendar',
//   templateUrl: './card-calendar.component.html',
//   styleUrls: ['./card-calendar.component.scss']
// })
// export class CardCalendarComponent implements OnInit {

//   @ViewChild('calendar') calendarComponent: FullCalendarComponent;
//   @Input() events: any[];

//   public calendarLocale: any;
//   public calendarVisible: boolean;
//   public calendarPlugins: any[];
//   public calendarWeekends: boolean;
//   public calendarEvents: EventInput[];
//   public allDaySlot: boolean;

//   public showEvent: boolean = false;
//   public selectedEvent: Service;
//   public allWorkers: [User];

//   public customEvents: any;


//   constructor(
//     private userService: UserService
//   ) {
//     this.calendarVisible = true;
//     this.calendarPlugins = [timeGrigPlugin, interactionPlugin, dayGridPlugin];
//     this.calendarWeekends = true;
//     this.calendarEvents = [];
//     this.calendarLocale = esLocale;
//     this.allDaySlot = false;
//   }



//   ngOnInit(): void {
//     this.getAllWorkers();
//   }

//   changeShowEvent(event){
//     this.showEvent = !this.showEvent;
//     const id = event.event.id;
//     const eventFiltered = this.events.filter(event => event._id === id);
//     this.selectedEvent = eventFiltered[0];
//   }

//   toggleVisible() {
//     this.calendarVisible = !this.calendarVisible;
//   }

//   getAllWorkers() {
//     this.userService.getUsers().subscribe(
//       data => {
//         this.allWorkers = data;
//         this.showEvents();
//       }, err => console.log('err', err));
//   }

//   showEvents() {

//     this.allWorkers.forEach(worker => {
//       this.events.forEach(event => {
//         if(worker.works.includes(event._id)){
//           const start = event.startDate.split('T')[0];
//           console.log("Start",start)
//           let { _id: id, name: title, startHours } = event;
//           title = startHours;
//           title += ` ${worker.name}`;
//           const color = worker.color;
//           const calEvent = [{ id, start, title, color, startHours }];
//           //this.calendarEvents.push(calEvent); //no funciona así, ni con push de object :(
//           this.calendarEvents = this.calendarEvents.concat(calEvent);
//         };
//       });
//     });
//     this.calendarEvents.sort((a, b) => a.startHours.localeCompare(b.startHours));
//     console.log('eventos1', this.calendarEvents);
//     this.customEvents = { events: this.calendarEvents, color: 'yellow', textColor: 'black' }
//   }



// }
