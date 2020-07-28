import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service/service.service';
import { UserService } from '../../services/user/user.service';
import { ClientService } from '../../services/client/client.service';
import { DropDownOptionsService } from '../../services/dropDownOptions/drop-down-options.service';
import { Service } from '../../models/service/service';
import { User } from '../../models/user/user';
import { Client } from '../../models/client/client';
import { NgForm } from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  //multiselect
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};


  public newService: Service;
  public newClient: Client;
  public allClients: Client[];
  public optionsStatus: string[];
  public optionsProvince: string[];
  public optionsMunicipality: string[];
  public searchNameUser: string;
  public searchNameClient: string;
  public hour: any;
  public isNewClient: boolean;

  public sameDirection: boolean = true;

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
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    // tslint:disable-next-line: max-line-length
    this.newClient = new Client(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality('Castellón/Castelló');
    this.isNewClient = true;
    this.sameDirection = false;
    //dropdown
    this.dropdownList = this.dropDownOptions.getActivities();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      enableCheckAll: false
    };
  }

  ngOnInit(): void {
    this.getAllClient();
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
  }

  clearClient(form: NgForm){
    form.resetForm(); 
    this.getAllClient();

  }

  searchClient(option: any){
    this.newClient = this.allClients.filter(client => client.numClient == option)[0];
  }

  createClientAndService(): void{
    const clientSelected = this.allClients.filter(client => client.numClient == this.newClient.numClient);
    console.log('client', clientSelected[0]);
    if(clientSelected.length > 0){
      this.clientService.updateClient(clientSelected[0]._id, this.newClient).subscribe(
        (data) => {
          this.createService(data.client._id);
        },
        (err) => {
          console.error('error: \n', err);
          this.messageErrorCreate('cliente');
          return;
        }
      );
    }else{
      this.clientService.createClient(this.newClient).subscribe(
        (data) => {
          this.createService(data.client._id);
        },
        (err) => {
          console.error('error: \n', err);
          this.messageErrorCreate('cliente');
          return;
        }
      );
    }
  }

  createService(clientId: any): void{
    this.newService.email = this.newService.email.toLowerCase();
    this.newService.startDate = new Date(2000,1,1);
    this.newService.startHours = "00:00"
    this.newService.workers = [];
    this.newService.activities = this.selectedItems
    console.log('selected acts', this.selectedItems);
    console.log('activities', this.newService.activities);
    this.serviceService.createService(this.newService, clientId).subscribe(
      (data) => {
        console.log('data', data);
        const urlIcon = '../../../assets/svg_2/ok.svg';
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
    if(this.sameDirection){
      this.newService.name = this.newClient.name;
      this.newService.lastName = this.newClient.lastName;
      this.newService.motherLastName = this.newClient.motherLastName;
      this.newService.email = this.newClient.email;
      this.newService.phoneOne = this.newClient.phoneOne;
      this.newService.phoneTwo = this.newClient.phoneTwo;
      this.newService.direction = this.newClient.direction;
      this.newService.numberExternal = this.newClient.numberExternal;
      this.newService.numberInternal = this.newClient.numberInternal;
      this.newService.province = this.newClient.province;
      this.newService.municipality = this.newClient.municipality;
      this.newService.postalCode = this.newClient.postalCode;
    } else {
      this.newService.name = null;
      this.newService.lastName = null;
      this.newService.motherLastName = null;
      this.newService.email = null;
      this.newService.phoneOne = null;
      this.newService.phoneTwo = null;
      this.newService.direction = null;
      this.newService.numberExternal = null;
      this.newService.numberInternal = null;
      this.newService.province = null;
      this.newService.municipality = null;
      this.newService.postalCode = null;
    }
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

  compareClient(form: NgForm){
    //Se busca el cliente entre todos los clientes con el num ingresado en el input de cliente
    let clientSelected = this.allClients.filter(client => client.numClient == this.newClient.numClient);
    clientSelected.length > 0 ? this.searchClient(clientSelected[0]) : this.resetInputs() ;
    console.log(clientSelected[0]);
    this.getAllClient();
  }

  resetInputs(){
    this.newClient.name = null;
    this.newClient.lastName = null;
    this.newClient.motherLastName = null;
    this.newClient.nameCompany = null;
    this.newClient.nif = null;
    this.newClient.email = null;
    this.newClient.phoneOne = null;
    this.newClient.phoneTwo = null;
    this.newClient.direction = null;
    this.newClient.numberExternal = null;
    this.newClient.numberInternal = null;
    this.newClient.province = null;
    this.newClient.municipality = null;
    this.newClient.postalCode = null;

  }

}
