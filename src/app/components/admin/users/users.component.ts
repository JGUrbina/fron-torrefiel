import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceService } from '../../../services/service/service.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';
import { EditComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public newUser: User;

  @ViewChild( EditComponent ) child : EditComponent ;

  public allUsers: User[];
  public displayNewUser: boolean = false;
  public editUserShow: boolean = false;
  public showUser: boolean = false;
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;
  public jobsOfUser: any;

  constructor(
    private typeDateService: TypeDateService,
    private userService: UserService,
    private serviceService: ServiceService,

  ) {
     this.newUser = new User(null, null, null, null, null, null, null, [null], [null], null, null, null);
     this.jobsOfUser = [];
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
        console.log("data", data.userName)
        data.userName!=undefined? this.jobsOfUser=data : null
        //this.jobsOfUser = data
      },
      err => {
        console.log(err);
      }
    )
  }

  editUser(id, newUser: User){
    console.log("user", newUser);
    this.userService.updateUser(id, newUser).subscribe(
      data => {
        console.log("ya editado", data)
        const urlIcon = '../../../../assets/svg_2/ok.svg';
        const header = '';
        const title = 'Usuario editado';
        const subtitle = 'exitosamente';
        this.showAlert(urlIcon, header, title, subtitle);
        this.getDataUser();
       // this.closeEditUser(); 
      },
      err => {
        console.log(err);
        this.messageErrorCreate(err.error);
      }
    )
    
  }

  showAlert(urlIcon: string, header: string, title: string, subtitle: string){
    console.log("titulo y sub", title, subtitle)
    this.alertUrlIcon = urlIcon;
    this.alertHeader = header;
    this.alertTitle = title;
    this.alertSubtitle = subtitle;
    this.alertShow = true;

    setTimeout(() => {
      this.alertShow = false;
    }, this.ALERTTIMESHOW);
  }

  getEditUser(id: string){
   console.log("Edit usuario id", id)
   this.editUserShow = true;
   this.userService.getUser(id).subscribe(
    (data) => {
      data.rol==="Administrador" ? data.rol = true : data.rol = false
      console.log('data new user', data);
      this.newUser = data; 
    },
    (err) => {
      //this.newUser.rol = null;
      console.error('error: \n', err.error);
      
      return;
    }
  );

  }

  messageErrorCreate(message: string){
    const urlIcon = '';
    const header = `Ha ocurrido un error`;
    const title = message;
    const subtitle = 'Intente nuevamente';
    this.showAlert(urlIcon, header, title, subtitle);
  }
  

  cerrar(input: string): void{
    this.editUserShow = false;
  }
 
  close(): void{
    this.displayNewUser = false;
  }

  closeEditUser(): void{
    this.editUserShow = false;
  }
  openNewUserModal(): void{
    this.displayNewUser = true;
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
    .subscribe(users => this.allUsers = users), (err: any) => console.log('err', err);
  }

  updateUsers(user: User){
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
  