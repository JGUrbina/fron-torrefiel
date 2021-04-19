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
  addHours, addMinutes,
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

  public selectedWork: any;

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
      }, err => console.log('err', err));
  }

  setEvents() {
    this.allWorkers.forEach(worker => {
      worker.works.forEach(work => {
        const tmpService = this.eventsInput.filter(event => event._id === work)[0];
        if (!!tmpService) {
          const [startHours, startMinutes] = tmpService.startHours.split(':').map(value => Number(value));
          const [endHours, endMinutes] = tmpService.endHours.split(':').map(value => Number(value));
          const start = addMinutes(addHours(new Date(tmpService.startDate.replace('.000Z', '')), startHours), startMinutes);
          const end = tmpService.endDate ? addMinutes(addHours(new Date(tmpService.endDate.replace('.000Z', '')), endHours), endMinutes) : addHours(start, 1);
          const title = `${tmpService.startHours} ${tmpService.endHours}  - ${worker.name} - ${tmpService.direction} ${tmpService.numberExternal && '#'} ${tmpService.numberExternal} ${tmpService.province} ${tmpService.municipality}`;
          const tmpEvent = {
            start,
            end,
            title,
            color: { primary: '#fff', secondary: worker.color },
            id: tmpService._id
          }
          this.events.push(tmpEvent);
        };
      });
    });
    this.refresh.next()
  };

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.selectedWork = this.eventsInput.find(event => event._id === this.modalData.event.id);
    console.log({selectedWork: this.selectedWork})
  }
}