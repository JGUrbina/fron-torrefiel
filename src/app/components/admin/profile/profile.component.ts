import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  public user: User;

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3000;

  constructor(private userService: UserService) {
    this.user = new User(null, null, null, null, null, null, null, null, [null], null, null);
  }

  ngOnInit(): void {
  }

  update(): void{ // actualizar a update
    /* this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
        const urlIcon = '../../../assets/svg_2/ok.svg';
        const header = 'Registro Correcto';
        const title = '¡Felicidades! Tu cuenta se a creado correctamente.';
        const subtitle = 'Espera el mail de confirmación';
        this.showAlert(urlIcon, header, title, subtitle);
      },
      (err) => {
        console.log('err', err);
        const urlIcon = '';
        const header = 'Ha ocurrido un error';
        const title = 'No se a podido realizar el registro, verifique sus datos.';
        const subtitle = 'Intente nuevamente.';
        this.showAlert(urlIcon, header, title, subtitle);
      }
    ); */
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

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
