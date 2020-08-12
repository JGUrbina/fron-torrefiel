import { Component, OnInit, Output, Input } from '@angular/core';
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
export class ChatComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() message: any[];
  @Input() id: string;

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
   this.chatService.connectSocket();
   this.chatService.getHistoryChat().subscribe(
     data=>{
       console.log("entro a histo", data)
     },err=>{console.log("error", err)}
   );

  // this.getMessage();

  } 

  ngOnDestroy(): void{
    console.log("cierra")
   // this._docSub.unsubscribe();
    this.chatService.destroyMessage()
  }

  getHistoryMessage(){
   //this.chatService.getHistoryMessage()
  }

  sendMessage(){
    console.log("entro a sendMessage")
    this.chatService.sendMessage(this.newMessage, null).subscribe(
      data=>{
        const msg = {
          text: this.newMessage,
            user: {
                userName: 'Marina',
              //  _id
            }
          }
        this.allMessages.push(msg);
       // this.getMessage()
        console.log("algo se ejecuta")
      },err=>{
        console.log("error", err)
      }
    
    )
    this.newMessage = ''
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
