import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
