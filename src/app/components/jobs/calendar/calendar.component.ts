import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
