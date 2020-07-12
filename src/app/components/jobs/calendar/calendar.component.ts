import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() startService: Date;
  @Input() hourService: any;
  @Input() descriptionService: any;
  @Input() nameClient: any;
  @Input() nameUser: any[];

  public allEvents: any;

  constructor() { }

  ngOnInit(): void {
    const names: any[] = [];
    for (const name of this.nameUser) {
      names.push(name);
    }

    this.allEvents = {
      title: this.nameClient,
      start: this.generateDate(this.startService, this.hourService),
      data: {
        user: names,
        description: this.descriptionService
      }
    };
  }

  generateDate(fecha: any, hour: any): string{
    fecha = fecha.toString().slice(0, 10);
    fecha += ` ${hour}`;

    return fecha;
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
