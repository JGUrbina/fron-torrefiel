import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from '../content-modal/content-modal.component';
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

  constructor(
    private ngbModalRef: NgbModal,
    public _UserService: UserService,
    private route: ActivatedRoute,
  ){ 
    this.passwordRepeat = '';
    this.user = {
      password: '',
    }
    this.showPass = false;
  }

  ngOnInit(): void {
    this.getToken();
    if(this.token){
      this._UserService.verifyUser(this.token).subscribe(
        (data) => {
          console.log(data);
        },
        (err)=> {
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
}
