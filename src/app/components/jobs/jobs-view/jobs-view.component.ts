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

  constructor(
    private serviceService: ServiceService,
  ) { }

  ngOnInit(): void {
    this.getDataService();
  }

  getDataService(): void{
    this.serviceService.getServices().subscribe(
      (data) => {
        console.log(data);
        this.allJobs = data;
      },
      (err) => {
        console.error('Error: \n', err);
      }
    );
  }
}
