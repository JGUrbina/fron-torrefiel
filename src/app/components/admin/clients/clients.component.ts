import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public allUsers: User[];

  constructor(
    private userService: UserService
  ) {
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.userService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
