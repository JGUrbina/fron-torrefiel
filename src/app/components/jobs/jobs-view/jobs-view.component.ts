import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent implements OnInit {
  
  @Input() searchFilter: string;
  @Output() years = new EventEmitter<any>();

  @ViewChild(JobComponent) child: JobComponent;

  public allJobs: Service[];

  constructor(
    private serviceService: ServiceService,
  ) { }

  ngOnInit(): void {
    this.getDataService();
  }

  updateJobsFromChilds(data){
    data.reverse();
    this.allJobs = data;
  }

  getDataService(): void{
    this.serviceService.getServices().subscribe(
      (data) => {
        data.services.reverse();
        const newData = [];
        data.services.forEach(el => {
          delete el.createdAt;
          delete el.updatedAt;
          newData.push(el);
        });
        //console.log('new', newData);
        this.allJobs = newData;
        console.log('all jobs', this.allJobs);
        this.years.emit(data.years);
      },
      (err) => {
        console.error('Error: \n', err);
      }
    );
  }
}
