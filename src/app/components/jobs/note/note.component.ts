import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() message: string;

  public allMessages: any[];

  constructor() { }

  ngOnInit(): void {
    this.allMessages = [
      {person: 'me', avatar: '', message: this.message, date: new Date()},
    ];
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
