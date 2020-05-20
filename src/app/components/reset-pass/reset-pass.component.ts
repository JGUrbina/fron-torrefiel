import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from '../content-modal/content-modal.component';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
    public user: any;
    public passwordRepeat: string;
    public token: string;
    public params: string;
    public showPass: boolean;
    public type: string;
    public userName: string;
    public userEmail: string;
    public alertHeader: string;
    public alertTitle: string;
    public alertSubtitle: string;

    constructor(
      private ngbModalRef: NgbModal,
      public _UserService: UserService,
      private route: ActivatedRoute,
    ){
      this.user = {password: ''};
      this.passwordRepeat = '';
      this.userName = '';
      this.userEmail = '';
      this.showPass = false;
      this.alertHeader = 'Activación correcta';
      this.alertTitle = '¡Felicidades! tu cuenta se ha activado correctamente';
      this.alertSubtitle = 'Ahora crea tu contraseña';
    }

    ngOnInit(): void {
      this.getToken();
      if (this.token){
        this._UserService.verifyUser(this.token).subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }

    getToken(): void{
      this.route.paramMap.subscribe(params => {
        this.token = params.get('token');
      });
    }

    openModal(): void{
      const options = {
        size: 'sm',
        windowClass: 'modal',
      };

      this.ngbModalRef.open(ContentModalComponent, options);
    }

    onSubmitPass(): void{
      this._UserService.setPassword(this.token).subscribe(
        (data) => {
          console.log(data);
          const title = 'Haz creación exitosa';
          const subtitle = `Haz creado tu contraseña exitosamente.<br><br> Ya puedes iniciar sesión`;
          this.showAlert(title, subtitle);
        },
        (err) => {
          console.log('err', err);
        }
      );
      console.log('hola aqui');
    }

    showAlert(title: string, subtitle: string){
      alert(title + subtitle);
    }

    resetPassword(): void{
      if (this.userEmail && this.userName){
        this._UserService.sendMailResetPassword(this.userEmail).subscribe(
          (data) => {console.log(data); },
          (err) => {console.log(err); }
        );
      }
    }
}
