import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from '../content-modal/content-modal.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModal]
})
export class LoginComponent implements OnInit {

  public showRegister: boolean;

  constructor(
    private ngbModalRef: NgbModal,
    public _UserService: UserService,
  ){ 
    this.showRegister = false;
  }

  ngOnInit(): void {
    this._UserService.getUsers().subscribe((data) => {
      //if(err) return;

      console.log(data);
    });
  }

  openModal(): void{
    const options = {
      size: 'sm',
      windowClass: 'modal',
    };

    this.ngbModalRef.open(ContentModalComponent, options);
  }

}
