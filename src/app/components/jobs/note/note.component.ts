import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  public allMessages: any[];
  public newMessage: string;

  constructor() { }

  ngOnInit(): void {
    this.allMessages = [
      {person: 'me', avatar: '', message: 'La cliente es algo especial, cuidado...', date: new Date()},
      {person: 'me', avatar: '', message: 'siempre hemos tenido problemas.', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'gracias', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
      {person: 'me', avatar: '', message: 'el cliente no abre, que hago?', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'ok, espera 5 min. Voy a localizarla', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
      {person: 'me', avatar: '', message: 'el cliente no abre, que hago?', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'ok, espera 5 min. Voy a localizarla', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
    ];
  }

  sendMessage(): void{
    const message = {
      person: 'me',
      avatar: '',
      message: this.newMessage,
      date: new Date()
    };
    this.allMessages.push(message);
    this.newMessage = '';
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
