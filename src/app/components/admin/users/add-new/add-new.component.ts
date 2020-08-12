import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { User } from '../../../../models/user/user';
import { Service } from '../../../../models/service/service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  public newUser: User;

  @Output () closeWindow = new EventEmitter();
  @Output () newUserCreated = new EventEmitter();

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;

  constructor(
    private userServices: UserService
  ) {
    this.newUser = new User(null, null, null, null, null, null, null, [null], [null], null, null, null);
   }

  ngOnInit(): void {
    console.log('userservice', this.userServices);
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

  createNewUser(){
    this.newUser.color = this.newUser.color === null ? '#000000' : this.newUser.color;
    console.log('user', this.newUser);

    this.userServices.createUser(this.newUser).subscribe(
      (data) => {
        console.log('data new user', data);
        const urlIcon = '../../../../assets/svg_2/ok.svg';
        const header = '';
        const title = 'Usuario Agregado Exitosamente';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
        this.newUserCreated.emit(data);
        this.clearFormUser();
        
      },
      (err) => {
        this.newUser.rol = null;
        console.error('error: \n', err.error);
        this.messageErrorCreate(err.error);
        return;
      }
    );
  }

  clearFormUser(){
    this.newUser =new User(null, null, null, null, null, null, null, null, null, null, null, null);
  }

  messageErrorCreate(message: string){
    const urlIcon = '';
    const header = `Ha ocurrido un error`;
    const title = message
    const subtitle = 'Intente nuevamente.';
    this.showAlert(urlIcon, header, title, subtitle);
  }

  showAlert(urlIcon: string, header: string, title: string, subtitle: string){
    this.alertUrlIcon = urlIcon;
    this.alertHeader = header;
    this.alertTitle = title;
    this.alertSubtitle = subtitle;
    this.alertShow = true;

    setTimeout(() => {
      this.alertShow = false;
    }, this.ALERTTIMESHOW);
  }
}
