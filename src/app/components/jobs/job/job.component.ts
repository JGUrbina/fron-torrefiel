import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() public job: Service;

  public nameClient: string;
  public nameWorker: string;

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
  ) { }

  ngOnInit(): void {
    this.getWorker(this.job.workers);
    this.getClient(this.job.client);
  }

  getWorker(id: string): void{
    this.userService.getUser(id).subscribe(
      (data) => { console.log( data); },
      (err) => {console.error('Error: ', err); }
    );
  }

  getClient(id: string): void{
    this.clientService.getClient(id).subscribe(
      (data) => { this.nameClient = data.name; },
      (err) => {console.error('Error: ', err); }
    );
  }

  close(input: string): void{
    this.sectionMenuShow = input;
  }

}
