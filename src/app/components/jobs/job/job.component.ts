import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../models/service/service';
import { Client } from '../../../models/client/client'
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() public job: Service;
  @Input() public client: Client;

  public nameClient: string;
  public nameWorker: string[] = [];

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
    this.getWorker(this.job.workers);
    this.getClient(this.job.client);
  }

  getWorker(ids: string[]): void{

    for (const id of ids) {
      this.userService.getUser(id).subscribe(
        (data) => { this.nameWorker.push(data.name); },
        (err) => {console.error('Error: ', err); }
      );
    }

  }

  async getClient(id: string): Promise<any>{
    this.client = await this.clientService.getClient(id);
    
  }

  close(input: string): void{
    this.sectionMenuShow = input;
  }

  getDate(date: any){
    return this.typeDateService.generateDateOnly(date);
  }
}
