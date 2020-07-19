import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() public job: Service;
  @Input() public clientData: Client;

  @Output() serviceToViews: EventEmitter <Service> = new EventEmitter();

  @ViewChild(ScheduleComponent ) child : ScheduleComponent ;

  public nameClient: string;
  public nameWorker: string[] = [];
  public worker: string[] = [];

  // views
  public DELIVERYNOTE: string = 'delivery note';
  public BILL: string = 'bill';
  public CALENDAR: string = 'calendar';
  public CHAT: string = 'chat';
  public IMAGES: string = 'images';
  public FIRM: string = 'firm';
  public NOTE: string = 'note';

  public sectionMenuShow: string;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private typeDateService: TypeDateService
  ) { }

  ngOnInit(): void {
    //this.getWorker(this.job.workers);
    this.getClient(this.job.client);
  }

  // getWorker(ids: string[]): void{

  //   for (const id of ids) {
  //     this.userService.getUser(id).subscribe(
  //       (data) => { 
  //         this.worker.push(data);
  //       },
  //       (err) => {console.error('Error: ', err); }
  //     );
  //   }

  // }

  async getClient(id: string): Promise<any>{
    const client = await this.clientService.getClient(id);
    //this.nameClient = client.name;
    this.clientData = client;
  }

  close(input: string): void{
    this.sectionMenuShow = input;
  }
  receiveDataFromChild(data) {
    this.serviceToViews.emit(data);
}
  getDate(date: any){
    return this.typeDateService.generateDateOnly(date);
  }
}
