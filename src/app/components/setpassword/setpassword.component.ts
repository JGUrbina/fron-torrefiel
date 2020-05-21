import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  public user: any;
  public passwordRepeat: string;
  public token: string;
  public params: string;
  public showPass: boolean;
  public type: string;
  public reset: boolean;

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
  ){
    this.passwordRepeat = '';
    this.user = {password: ''};
    this.showPass = false;
    this.reset = false;
  }

  ngOnInit(): void {
    this.getToken();
    if (this.token){
      this.userService.verifyUser(this.token).subscribe(
        () => {
          const urlIcon = '../../../assets/svg/ok-yellow.svg';
          const header = 'Activación correcta';
          const title = '¡Felicidades! Tu cuenta se ha activado correctamente.';
          const subtitle = 'Ahora crea tu contraseña';
          if (!this.reset) { this.showAlert(urlIcon, header, title, subtitle); }
        },
        (err) => {
          console.log(err);
          const urlIcon = '';
          const header = 'Error en Activación';
          const title = 'Intentelo nuevamente o solicite un nuevo correo.';
          const subtitle = '';
          this.showAlert(urlIcon, header, title, subtitle);
        }
      );
    }
  }

  getToken(): void{
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.reset = params.get('passwordreset') === 'passwordreset';
    });
  }

  registerPassword(): void{
    this.userService.setPassword(this.token, this.user.password).subscribe(
      (data) => {
        console.log(data);
        const urlIcon = '../../../assets/svg/ok.svg';
        const header = this.reset ? 'Activación correcta' : 'Creación exitosa';
        const title = this.reset ? 'Recuerda esta nueva contraseña para que no se te vuelva a olvidar' : 'Haz creado tu contraseña exitosamente.';
        const subtitle = this.reset ? '' : 'Ya puedes iniciar sesión';
        this.showAlert(urlIcon, header, title, subtitle);
      },
      (err) => {
        console.log('err', err);
        const urlIcon = '';
        const header = 'A ocurrido un error';
        const title = this.reset ? 'Revisa los datos ingresados' : 'Los mails de confirmación tienen una vigencia de 3 horas.';
        const subtitle = this.reset ? 'Intenta nuevamente' : 'No tienes acceso para esta acción';
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
