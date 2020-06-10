import { Component, OnInit } from '@angular/core';
import { DropDownOptionsService } from '../../../services/dropDownOptions/drop-down-options.service';
import { Client } from '../../../models/client/client';
import { ClientService } from 'src/app/services/client/client.service';
import { Service } from '../../../models/service/service';
import { ServiceService } from '../../../services/service/service.service';
import { User } from '../../../models/user/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public allClients: Client[];
  public allUsers: User[];

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
    private clientService: ClientService,
    private serviceService: ServiceService,
    private userService: UserService,
    private dropDownOptions: DropDownOptionsService,
  ) {
     // tslint:disable-next-line: max-line-length
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    // tslint:disable-next-line: max-line-length
    this.newClient = new Client(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.optionsActivities = this.dropDownOptions.getActivities();
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality();
  }

  ngOnInit(): void {
    this.getDataClient();
  }

  getDataClient(): void{
    this.clientService.getClients().subscribe(
      (data) => {
        this.allClients = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showOptions(view: string): void{
    this.show = this.OPTIONS;
    this.showView = view;
  }

}
