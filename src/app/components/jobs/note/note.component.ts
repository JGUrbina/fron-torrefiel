import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from '../../../services/service/service.service';
import { NotesService } from '../../../services/notes/notes.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output() closeWindow = new EventEmitter();
  @Input() message: any[];
  @Input() id: string;

  public prueba = [];
  public nota: string;
  public newMessage: string;
  public allNotes: any[];
  public userName: string;
  public fecha: string;
  public CurrentYear: any;
  public CurrentMonth: any;
  public CurrentDay: any;
  public CurrentHour: any;
  public CurrentMinutes: any;
  public CurrentSeconds: any;


  constructor(
    private serviceService: ServiceService,
    private noteService: NotesService,

  ) {

  }

  ngOnInit(): void {
    this.getNote()
  }

  sendMessage(): void {
    if (this.newMessage == undefined || this.newMessage == '') {
      return
    } else {

      this.CurrentYear = new Date().getFullYear();
      this.CurrentMonth = new Date().getMonth() + 1;
      this.CurrentDay = new Date().getDay();
      this.CurrentHour = new Date().getHours();
      this.CurrentMinutes = new Date().getMinutes();
      this.CurrentSeconds = new Date().getSeconds();
      this.fecha = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.`

      this.userName = localStorage.getItem('some-key') == null ? 'nickName' : JSON.parse(localStorage.getItem('some-key')).name

      const msg = {
        note: this.newMessage,
        createdAt: this.fecha,
        userName: this.userName
      };

      this.allNotes.push(msg);
      console.log('msg', msg);
      this.noteService.addNotes(this.id, msg).subscribe(
        (data) => {
          console.log("dataSend", data)
        },
        (err) => {
          console.log("error", err)
        }
      )
      this.newMessage = '';
    }

  }

  getNote() {
    this.noteService.getNotes(this.id).subscribe(
      data => {
        console.log("dataGet", data)
        this.allNotes = data;
      },
      (err) => {
        console.log("error", err)
      }
    )
  }

  emitEvent(): void {
    this.closeWindow.emit('');
  }
}
