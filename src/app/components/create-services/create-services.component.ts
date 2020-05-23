import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service/service.service';
import { Service } from '../../models/service/service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  public newService: Service;

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3000;

  constructor(
    public serviceService: ServiceService,
    public router: Router,
  ) {
    this.newService = new Service('', '', '', null, null, null, {}, {});
  }

  ngOnInit(): void {
  }

  saveService(){
    this.serviceService.createService(this.newService).subscribe(
      (data) => {
        console.log(data);
        const urlIcon = '../../../assets/svg/ok.svg';
        const header = 'Registro Correcto';
        const title = 'Si deseas editarlo puedes hacerlo en Administrador';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
      },
      (err) => {
        console.log('err', err);
        const urlIcon = '';
        const header = 'Ha ocurrido un error';
        const title = 'No se a podido realizar el registro, verifique los datos.';
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
