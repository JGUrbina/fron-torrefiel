import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import  { ServiceService }  from '../../../services/service/service.service';
import { NotesService } from '../../../services/notes/notes.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() message: any[];
  @Input() id: string;

  public allMessages: any[];
  public prueba = [];
  public nota: string;
  public newMessage: string;
  public allNotes: any[];


  constructor(
    private serviceService: ServiceService,
    private noteService: NotesService,
   
  ) { 
    
  }

  ngOnInit(): void {
    this.allMessages=[];
    
    //console.log("mensaje y id", this.message, this.id);
   
    if(this.message!=null){
     // console.log("this message", this.message)
      this.message.forEach(msg=>{
        //console.log("msg", msg)
        this.allMessages.push(msg);
      })
    } else{
      this.allMessages = [];
    }
    console.log("prueba",this.prueba,this.allMessages[0])
    if(this.prueba[0]!=this.allMessages[0]){
      this.prueba=this.allMessages;
    } 
    this.getNote()

  }

  sendMessage(): void{
    this.newMessage!='' ?  this.allNotes.push({ note: this.newMessage }) : null
    console.log("allNotes",this.allNotes)
    this.noteService.addNotes(this.id, this.newMessage).subscribe(
      (data)=>{
        console.log("dataSend",data)
      },
      (err)=>{
        console.log("error",err)
      }
    )

    this.newMessage = '';
  }

  getNote(){
    this.noteService.getNotes(this.id).subscribe(
      data=>{
        console.log("dataGet", data)
        this.allNotes = data;
      },
      (err)=>{
        console.log("error", err)
      }
    )
  }
 
  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
