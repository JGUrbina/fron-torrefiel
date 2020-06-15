import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() startService: Date;
  @Input() hourService: any;
  @Input() nameClient: any;

  public allEvents: any;

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line: max-line-length
    const start = new Date(this.startService + this.hourService);
    console.log(start);
    console.log(this.startService);
    this.allEvents = {
      title: this.nameClient,
      start: this.startService
    };
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
