import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {

  public showRegister: boolean;
  public newUser: User;
  public userName: string;
  public password: string;
  public showPass: boolean;

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3000;

  constructor(
    public userService: UserService,
    public router: Router,
  ){
    this.showPass = false;
    this.showRegister = false;
    this.newUser = new User('', '', '', '', '', '', '', null, [null], null, null, null);
  }

  ngOnInit(): void {}

  register(): void{
    this.userService.createUser(this.newUser).subscribe(
      (data) => {
        console.log(data);
        const urlIcon = '../../../assets/svg/ok.svg';
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
    );
  }

  logIn(): void{
    if (!this.userName && !this.password){
      const urlIcon = '';
      const header = 'ha ocurrido un error';
      const title = 'Verifique los datos ingresados.';
      const subtitle = 'No tienes acceso para esta acción';
      this.showAlert(urlIcon, header, title, subtitle);
      return;
    }

    const userLogin = { userName: this.userName, password: this.password};
    this.userService.login(userLogin).subscribe(
      (data) => {
        const {  token }  = data;
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        const urlIcon = '';
        const header = 'Ha ocurrido un error';
        const title = 'Verifique los datos ingresados. he intente nuevamente.';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
      }
    );
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
