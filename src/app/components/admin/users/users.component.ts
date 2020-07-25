import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceService } from '../../../services/service/service.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public allUsers: User[];
  public displayNewUser: boolean = false;

  public showUser: boolean = false;

  public jobsOfUser: any;

  constructor(
    private typeDateService: TypeDateService,
    private userService: UserService,
    private serviceService: ServiceService
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
        console.error(err);
      }
    );
  }

  getWorks(id: string){
    this.serviceService.getWorks(id).subscribe(
      data => {
        console.log(data)
        this.jobsOfUser = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  close(): void{
    this.displayNewUser = false;
  }

  openNewUserModal(): void{
    this.displayNewUser = true;
  }

  deleteUser(id) {
    this.userService.deleteUser(id)
    .subscribe(users => this.allUsers = users), err => console.log('err', err);
  }

  updateUsers(user){
    this.allUsers.push(user);
  }

  openWorks(id: string){
    this.showUser = true;
    this.getWorks(id);
  }

  getDate(date: any){
    return this.typeDateService.generateDateOnly(date);
  }

}
  