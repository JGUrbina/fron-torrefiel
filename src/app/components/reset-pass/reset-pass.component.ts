import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
    public userName: string;
    public userEmail: string;

    // alert variables
    public alertShow: boolean = false;
    public alertUrlIcon: string;
    public alertHeader: string;
    public alertTitle: string;
    public alertSubtitle: string;
    private ALERTTIMESHOW: number = 3500;

    constructor(
      public userService: UserService,
    ){
    }

    ngOnInit(): void {}

    resetPasswordMail(): void{
      if (!this.userEmail && !this.userName){
        const urlIcon = '';
        const header = 'Error de Envío';
        const title = 'Ha ocurrido un error al intentar enviar su correo de recuperación; Verifique sus datos.';
        const subtitle = 'Intente nuevamente.';
        this.showAlert(urlIcon, header, title, subtitle);
        return;
      }

      const params = {
        userName: this.userName,
        email: this.userEmail
      };
      this.userService.sendMailResetPassword(params).subscribe(
        (data) => {
          const urlIcon = '../../../assets/svg/ok.svg';
          const header = 'Envío correcto';
          const title = 'Revisa tu correo registrado para poder recuperar tu contraseña.';
          const subtitle = '';
          this.showAlert(urlIcon, header, title, subtitle);
        },
        (err) => {
          console.error(err);
          const urlIcon = '';
          const header = 'Error de Envío';
          const title = 'Ha ocurrido un error al intentar enviar su correo de recuperación; Verifique sus datos.';
          const subtitle = 'Intente nuevamente.';
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
