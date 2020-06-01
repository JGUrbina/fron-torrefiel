import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent implements OnInit {

  public allJobs: Service[];

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
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.getDataService();
  }

  getDataService(): void{
    this.serviceService.getServices().subscribe(
      (data) => {
        this.allJobs = data;
        console.log(this.allJobs);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
