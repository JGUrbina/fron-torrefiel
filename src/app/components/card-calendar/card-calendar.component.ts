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
  DateAdapter
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
  @Input() events: CalendarEvent[];
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
        const tmpService = this.eventsInput.filter(event => event._id === work)[0];
        if (!!tmpService) {
          const tmpHours = Number(tmpService.startHours.split(':')[0]);
          const tmpEvent = {
            start: addHours(new Date(tmpService.startDate.replace('.000Z', '')), tmpHours),
            title: `${tmpService.startHours} ${worker.name}`,
            color: { primary: '#cd2a00;', secondary: worker.color },
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
    console.log('selected', this.selectedWork);
  }
}