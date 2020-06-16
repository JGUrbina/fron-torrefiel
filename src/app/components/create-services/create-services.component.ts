import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service/service.service';
import { UserService } from '../../services/user/user.service';
import { ClientService } from '../../services/client/client.service';
import { DropDownOptionsService } from '../../services/dropDownOptions/drop-down-options.service';
import { Service } from '../../models/service/service';
import { User } from '../../models/user/user';
import { Client } from '../../models/client/client';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  public newService: Service;
  public newClient: Client;
  public allUsers: User[];
  public allClients: Client[];
  public optionsActivities: string[];
  public optionsStatus: string[];
  public optionsProvince: string[];
  public optionsMunicipality: string[];
  public searchNameUser: string;
  public searchNameClient: string;
  public hour: any;

  public useDirectionEqual: boolean = true;

  // vistas
  public USER: string = 'user';
  public SERVICEDIRECTION: string = 'service direction';
  public SERVICE: string = 'service';
  public viewActual: string = this.USER;

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;

  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,
    private dropDownOptions: DropDownOptionsService,
    public router: Router,
  ) {
    // tslint:disable-next-line: max-line-length
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    // tslint:disable-next-line: max-line-length
    this.newClient = new Client(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.optionsActivities = this.dropDownOptions.getActivities();
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality('Castellón/Castelló');
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.getAllClient();
    this.getAllUser();
  }

  getAllUser(): void{
    this.userService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }

  getAllClient(): void{
    this.clientService.getClients().subscribe(
      (data) => {
        this.allClients = data;
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }

  // if el cliente existe
  clientExisting(): void {
    // autocompletar data :
    /*
      nombres
      apellidos
      telefono
      correo electronico
      provincia
      municipio
      direction
      postalcode
    */

    // agregar nuevo servicio al cliente
  }

  createClient(): void{
    // si existe con ese numero de cliente se actualiza
    // this.idClientFinal = data.id;

    // si no existe lo creo y luego le asigno el trabajo
    /* this.clientService.createClient(this.newClient).subscribe(
      (data) => {
        console.log(data, '******* DATA');
        this.newClient._id = data._id;
        this.viewActual = this.SERVICEDIRECTION;
        this.updateView(this.SERVICEDIRECTION);
      },
      (err) => {
        console.error('error: \n', err);
        this.messageErrorCreate('cliente');
        return;
      }
    ); */
    this.updateView(this.SERVICEDIRECTION);
  }

  createService(): void{
    console.log(this.newService);
    /* this.serviceService.createService(this.newService, this.newService._id).subscribe(
      (data) => {
        console.log(data);
        const urlIcon = '../../../assets/svg/ok.svg';
        const header = 'Registro Correcto';
        const title = 'Si deseas editarlo puedes hacerlo en Administrador';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
      },
      (err) => {
        console.error('error: \n', err);
        this.messageErrorCreate('servicio');
      }
    ); */
  }

  createServiceAndSendPDF(): void{
    this.serviceService.createService(this.newService, this.newService._id).subscribe(
      (data) => {
        // ENVIAR PDF
        console.log(data, ' ENVIAR PDF');
        const urlIcon = '../../../assets/svg/ok.svg';
        const header = 'Registro Correcto';
        const title = 'Si deseas editarlo puedes hacerlo en Administrador';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
      },
      (err) => {
        console.error('error: \n', err);
        this.messageErrorCreate('servicio');
      }
    );
  }

  updateView(view: string): void{
    this.viewActual = view;
  }

  messageErrorCreate(where: string){
    const urlIcon = '';
    const header = `Ha ocurrido un error ${where}`;
    const title = 'No se a podido realizar el registro, verifique los datos.';
    const subtitle = 'Intente nuevamente.';
    this.showAlert(urlIcon, header, title, subtitle);
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
