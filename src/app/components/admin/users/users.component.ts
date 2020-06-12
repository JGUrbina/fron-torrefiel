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

  public showUser: boolean = false;
  public jobsOfUser: any[] = [
    {numClient: '#01', dateStart: '00/00/0000', name: 'karem'},
    {numClient: '#02', dateStart: '00/00/0000', name: 'karem'},
    {numClient: '#03', dateStart: '00/00/0000', name: 'karem'},
  ];

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
