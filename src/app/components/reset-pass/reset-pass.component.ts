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
    public user: object;
    public passwordRepeat: string;
    public token: string;
    public params: string;
  
    constructor(
      private ngbModalRef: NgbModal,
      public _UserService: UserService,
      private route: ActivatedRoute,
    ){ 
      this.passwordRepeat = '';
      this.user = {
        password: ''
      }
    }
  
    ngOnInit(): void {
      this.getToken();
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
  
  }
