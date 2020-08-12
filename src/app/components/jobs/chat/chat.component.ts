import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import  { ServiceService }  from '../../../services/service/service.service';
import { ChatService } from '../../../services/chat/chat.service'
import { Subscription } from 'rxjs';

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
  private _docSub: Subscription;

  constructor(
    private serviceService: ServiceService,
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
  }

  loadMessages(){
    this.chatService.initSocket();
    this.chatService.getHistory().subscribe(data => this.allMessages = data.reverse()), err => console.log('err', err);
  }

  getMessages(){
    this.chatService.getMessage().subscribe(data => this.allMessages.push(data)), err => console.log('err', err);
  }

  getHistoryMessage(){
   //this.chatService.getHistoryMessage()
  }

  sendMessage(){
    const msg = {
      text: this.newMessage,
      user: { userName: 'Yo', _id: 12331412 }
    };
    this.chatService.sendMessage(msg);
    this.allMessages.push(msg);
    this.newMessage = '';
  }

  getMessage(){
    console.log("entro a get")
    //this.allMessages.push(this.newMessage);
    this.chatService.newMessage().subscribe(
      data=>{
        console.log("data de get", data)
        //this.allMessages = data;
      }, err=>{
        console.log("error", err)
      }
    )
  }

  getNote(){
  //     this.noteService.getNotes(this.id).subscribe(
  //       data=>{
  //         console.log("dataGet", data)
  //         this.allNotes = data;
  //       },
  //       (err)=>{
  //         console.log("error", err)
  //       }
  //     )  
   }
 
  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
