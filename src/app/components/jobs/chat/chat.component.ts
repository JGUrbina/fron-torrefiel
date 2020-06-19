import { Component, OnInit, Output } from '@angular/core';
/* import { ChatService } from 'src/app/services/chat/chat.service'; */
import { Chat } from 'src/app/models/chat/chat';
import { User } from 'src/app/models/user/user';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  public message: Chat;
  public user: User;
  public visited: boolean;
  public allMessages: any[];
  public newMessage: string;

  constructor(
    /* private chatService: ChatService */
  ) {
    /* this.user = new User('', '', '', '', '', '', '', null, [null], '', false, null, null);
    this.message = new Chat(this.user, 'hola', [{}]); */
  }

  ngOnInit(): void {
    this.allMessages = [
      {person: 'me', avatar: '', message: 'el cliente no abre, que hago?', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'ok, espera 5 min. Voy a localizarla', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
      {person: 'me', avatar: '', message: 'el cliente no abre, que hago?', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'ok, espera 5 min. Voy a localizarla', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
      {person: 'me', avatar: '', message: 'el cliente no abre, que hago?', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'ok, espera 5 min. Voy a localizarla', date: new Date()},
      {person: 'me', avatar: '', message: 'ok espero, sino que hago? 👱👱', date: new Date()},
      {person: 'admin', avatar: '../../../../assets/svg_2/avatar.svg', message: 'sino, presiona visitado aqui y vete', date: new Date()},
      {person: 'me', avatar: '', message: 'Perfecto así haré', date: new Date()},
    ];
  }

  changeStatusVisit(): void{
    this.visited = !this.visited;
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
