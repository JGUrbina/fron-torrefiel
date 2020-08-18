import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service'
import { getLocaleDateFormat } from '@angular/common';
import { now } from 'jquery';


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
  public fecha: string;
  public CurrentYear: any;
  public CurrentMonth: any;
  public CurrentDay: any;
  public CurrentHour: any;
  public CurrentMinutes: any;
  public CurrentSeconds: any;

  constructor(
    private chatService: ChatService,
  ) { 
    this.allMessages = [];
  }

  ngOnInit() {
    this.loadMessages();
    this.getMessages();
  }

  ngOnDestroy(): void{
    this.chatService.closeAllConections();
    console.log("chat destroy", this.chat )
  }

  loadMessages(){
    this.chatService.initSocket();
    this.chatService.getHistory().subscribe(data => {
      console.log("chat", data)
      this.allMessages = data.reverse();
     
    }), err => console.log('err', err);
    setTimeout(function(){
      this.chat = document.getElementById('main'); 
      this.chat==null? null : this.chat.scrollTop=this.chat.scrollHeight 
    },500)
  }

  getMessages(){
    this.chatService.getMessage().subscribe(data => this.allMessages.push(data)), err => console.log('err', err);
    setTimeout(function(){
      this.chat = document.getElementById('main'); 
      this.chat==null? null : this.chat.scrollTop=this.chat.scrollHeight 
    },500)
  }

  sendMessage(){
    this.CurrentYear = new Date().getFullYear();
    this.CurrentMonth = new Date().getMonth() + 1;
    this.CurrentDay = new Date().getDay();
    this.CurrentHour = new Date().getHours();
    this.CurrentMinutes = new Date().getMinutes();
    this.CurrentSeconds = new Date().getSeconds();

    this.fecha = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.`
    this.nickName = localStorage.getItem('some-key')==null ? 'nickName' :  JSON.parse(localStorage.getItem('some-key')).name
    const msg = {
      text: this.newMessage,
      createdAt: this.fecha,
      user: { userName: this.nickName , _id: 12331412 }
    };
    this.chatService.sendMessage(msg);
    this.allMessages.push(msg);
    this.newMessage = '';
    console.log("NW", this.newMessage)
    setTimeout(function(){
      this.chat = document.getElementById('main'); 
      this.chat==null? null : this.chat.scrollTop=this.chat.scrollHeight 
    },500)
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
