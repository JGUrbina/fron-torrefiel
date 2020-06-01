import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public allClients: Client[];

  constructor(
    private clientService: ClientService
  ) {
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

}
