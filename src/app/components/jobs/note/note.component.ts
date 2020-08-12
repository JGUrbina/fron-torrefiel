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
    this.getNote()
  }

  sendMessage(): void{
    if(this.newMessage==undefined || this.newMessage=='') {
      return
    }else{
      this.allNotes.push({ note: this.newMessage })
      console.log("newMessage",(this.newMessage!=undefined || this.newMessage!=''))
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
