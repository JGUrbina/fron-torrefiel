import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public allUsers: User[];

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser(): void{
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
