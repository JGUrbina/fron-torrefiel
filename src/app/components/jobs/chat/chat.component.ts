import { Component, OnInit } from '@angular/core';
/* import { ChatService } from 'src/app/services/chat/chat.service'; */
import { Chat } from 'src/app/models/chat/chat';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public message: Chat;
  public user: User;

  /* constructor(private chatService: ChatService) {
    this.user = new User('', '', '', '', '', '', '', null, [null], '', false, null, null);
    this.message = new Chat(this.user, 'hola', [{}]);
  } */

  ngOnInit(): void {
    /* this.chatService.sendMessage(this.message).subscribe(
      (data) => {
        console.log(data);
      }
    ); */
  }

}
