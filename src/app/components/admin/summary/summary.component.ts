import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
