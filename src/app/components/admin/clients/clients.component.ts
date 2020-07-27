import { Component, OnInit } from '@angular/core';
import { DropDownOptionsService } from '../../../services/dropDownOptions/drop-down-options.service';
import { Client } from '../../../models/client/client';
import { ClientService } from 'src/app/services/client/client.service';
import { Service } from '../../../models/service/service';
import { ServiceService } from '../../../services/service/service.service';
import { User } from '../../../models/user/user';
import { UserService } from '../../../services/user/user.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;

  public allClients: Client[];
  public allUsers: User[];
  public allServiceOfClient: any;

  public searchClient: string;


  public newService: Service;
  public newClient: Client;
  public optionsActivities: string[];
  public optionsStatus: string[];
  public optionsProvince: string[];
  public optionsMunicipality: string[];
  public searchNameClient: string;

  public show: string = '';
  public showView: string = '';
  public OPTIONS: string = 'options';
  public EDITUSER: string = 'edit user';
  public SERVICES: string = 'service';
  public EDITSERVICE: string = 'edit service';

  constructor(
    private typeDateService: TypeDateService,
    private clientService: ClientService,
    private serviceService: ServiceService,
    private userService: UserService,
    private dropDownOptions: DropDownOptionsService,
  ) {
     // tslint:disable-next-line: max-line-length
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    // tslint:disable-next-line: max-line-length
    this.newClient = new Client(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.optionsActivities = this.dropDownOptions.getActivities();
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality('Castellón/Castelló');
  }

  ngOnInit(): void {
    this.getDataClient();
  }

  getDate(date: any){
    return this.typeDateService.generateDateOnly(date);
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

  getDataClient(): void{
    this.clientService.getClients().subscribe(
      (data) => {
        this.allClients = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  editClient(client, view: string){
    console.log('client', client);
    this.showOptions(view);
    this.newClient = client;
  }

  showOptions(view: string): void{
    this.show = this.OPTIONS;
    this.showView = view;
  }

  showServices(client, view: string): void{
    this.show = this.OPTIONS;
    this.showView = view;
    this.clientService.getServices(client._id).subscribe(
      data => {
        console.log('data', data);
        this.allServiceOfClient = data.services;
      }, err => {
        console.log('err', err);
      }
    );
  };

  hideOptions(){
    this.show = '';
    this.showView = '';
  }

  updateClient(){
    this.clientService.updateClient(this.newClient._id, this.newClient).subscribe(
      data => {
        console.log('edited!', data);
        const urlIcon = '../../../assets/svg_2/ok.svg';
        const header = 'Registro Correcto';
        const title = 'Los datos del cliente se actualizaron correctamente';
        const subtitle = '';
        this.showAlert(urlIcon, header, title, subtitle);
        this.hideOptions();
      }, err => {
        console.log('err', err);
      }
    )
  }
}
