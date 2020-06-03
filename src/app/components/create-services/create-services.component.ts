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

  private numberClientFinal: string;

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

  // alert variables
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3000;

  constructor(
    private serviceService: ServiceService,
    private userService: UserService,
    private clientService: ClientService,
    private dropDownOptions: DropDownOptionsService,
    public router: Router,
  ) {
    // tslint:disable-next-line: max-line-length
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.newClient = new Client(null, null, null, null, null, null, null, null, null, null);
    this.optionsActivities = this.dropDownOptions.getActivities();
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality();
    this.allUsers = [];

    this.newService.numService = 1;
    this.newService.numDeliveryNote = 1;
    this.newService.numBill = 1;
    this.newService.descriptionShort = 'description short';
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

  createClientAndService(): void{
    // si existe con ese id le asigno el trabajo
    // this.idClientFinal = data.id;

    this.newClient.direction = `${this.newClient.province}, ${this.newClient.municipality}`;
    console.log(this.newClient);
    console.log(this.newService);

    // si no existe lo creo y luego le asigno el trabajo
    this.clientService.createClient(this.newClient).subscribe(
      (data) => {
        console.log(data, '******* DATA');
        this.saveService(data.numClient);
      },
      (err) => {
        console.error('error: \n', err);
        this.messageErrorCreate();
        return;
      }
    );
  }

  saveService(idClient: string){
    this.newService.client = idClient;
    this.serviceService.createService(this.newService, idClient).subscribe(
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
        this.messageErrorCreate();
      }
    );
  }

  messageErrorCreate(){
    const urlIcon = '';
    const header = 'Ha ocurrido un error';
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
