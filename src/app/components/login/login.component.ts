import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from '../content-modal/content-modal.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModal]
})
export class LoginComponent implements OnInit {

  public showRegister: boolean;
  public newUser: User;

  constructor(
    private ngbModalRef: NgbModal,
    public _UserService: UserService,
  ){ 
    this.showRegister = false;
    this.newUser = new User('', '', '', '', '', '', '', null, [null], '', false, null, null,);
  }

  ngOnInit(): void {
    this._UserService.getUsers().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  openModal(): void{
    const options = {
      size: 'sm',
      windowClass: 'modal',
    };

    this.ngbModalRef.open(ContentModalComponent, options);
  }

  onSubmit(): void{
    this._UserService.createUser(this.newUser).subscribe(
      (data) => {
        console.log(data);
        const title = 'Registro Correcto';
        const subtitle = `¡Felicidades! Tu cuenta se a creado correctamente.<br><br> Espera el mail de confirmación`;
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
