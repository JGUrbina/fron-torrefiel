import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Output () closeWindow = new EventEmitter();
  @Input() message: any[];
  @Input() id: string;

  ioConnection: any;
  public allMessages: any[];
  public prueba = [];
  public nota: string;
  public newMessage: string;
  public allNotes: any[];
  public nickName: any[];
  public chat: any;

  constructor(
    private chatService: ChatService,
  ) { 
    this.allMessages = [];
  }

  ngOnInit() {
    this.loadMessages();
    this.getMessages();
    console.log("chat", this.chat);
    setInterval(function(){
      this.chat = document.getElementById('main'); 
      this.chat==null? null : this.chat.scrollTop=this.chat.scrollHeight 
    },500)
  }

  ngOnDestroy(): void{
    this.chatService.closeAllConections();
    console.log("chat destroy", this.chat )
  }

  loadMessages(){
    this.chatService.initSocket();
    this.chatService.getHistory().subscribe(data => this.allMessages = data.reverse()), err => console.log('err', err);
  }

  getMessages(){
    this.chatService.getMessage().subscribe(data => this.allMessages.push(data)), err => console.log('err', err);
  }

  sendMessage(){
    this.nickName = localStorage.getItem('some-key')==null ? 'nickName' :  JSON.parse(localStorage.getItem('some-key')).name
    const msg = {
      text: this.newMessage,
      user: { userName: this.nickName , _id: 12331412 }
    };
    this.chatService.sendMessage(msg);
    this.allMessages.push(msg);
    this.newMessage = '';
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
