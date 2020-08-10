import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { User } from 'src/app/models/user/user';
import { Service } from 'src/app/models/service/service';

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
  public selectedEvent: Service;
  public allWorkers: [User];

  

  constructor(
    private userService: UserService
  ) {
    this.calendarVisible = true;
    this.calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
    this.calendarWeekends = true;
    this.calendarEvents = [];
    this.calendarLocale = esLocale;
  }

  getBody(){
    

    document.getElementById('body').onclick = function(e) {
      console.log("evento",  e.target, e.currentTarget)
      document.getElementById('show__calendar').onclick = function(ev){
        if(ev.currentTarget == document.getElementById('show__calendar')){
          console.log("inside");
        }
        else{
          console.log("outside")
        }
      }

    }
  

 }


  ngOnInit(): void {
    this.getAllWorkers();
    this.getBody();
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