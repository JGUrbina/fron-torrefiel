import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent implements OnInit {

  @ViewChild(JobComponent) child: JobComponent;

  public allJobs: Service[];

  constructor(
    private serviceService: ServiceService,
  ) { }

  ngOnInit(): void {
    this.getDataService();
  }

  updateJobsFromChilds(data){
    this.allJobs = data;
  }

  getDataService(): void{
    this.serviceService.getServices().subscribe(
      (data) => {
        this.allJobs = data;
        console.log('all jobs', this.allJobs)
      },
      (err) => {
        console.error('Error: \n', err);
      }
    );
  }
}
