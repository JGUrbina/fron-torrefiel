import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent implements OnInit, OnChanges {
  
  @Input() searchFilters: { type: string, filter: string }[];
  @Output() years = new EventEmitter<any>();

  @ViewChild(JobComponent) child: JobComponent;

  public allJobs: Service[];
  public filteredJobs: Service[];

  constructor(
    private serviceService: ServiceService,
  ) { }

  ngOnInit(): void {
    this.getDataService();
    this.searchFilters = [];
  }

  ngOnChanges(): void{
    this.handleFilters();
  }

  updateJobsFromChilds(data){
    data.reverse();
    this.allJobs = data;
  }

  getDataService(): void{
    this.serviceService.getServices().subscribe(
      (data) => {
        data.services.reverse();
        this.allJobs = data.services;
        console.log('all jobs', this.allJobs);
        this.filteredJobs = this.allJobs;
        this.years.emit(data.years);
      },
      (err) => {
        console.error('Error: \n', err);
      }
    );
  }

  handleFilters(): void{
    if(!this.searchFilters) return;
    const validFilters = this.searchFilters.filter(filter => filter.filter.length > 0);
    console.log({validFilters});
    if(validFilters.length === 0) {
      this.filteredJobs = this.allJobs;
    }else {
      this.filteredJobs = this.allJobs.filter(job => {
        let didMatch = true;
        validFilters.forEach(filter => {
          if(
            filter.type === 'keywords' &&
            !(
              job.description.toLowerCase().includes(filter.filter) ||
              job.client.name.toLowerCase().includes(filter.filter) ||
              job.name.toLowerCase().includes(filter.filter) ||
              job.direction.toLowerCase().includes(filter.filter) ||
              job.activities.includes(filter.filter) ||
              job.email.toLowerCase().includes(filter.filter) ||
              job.municipality.toLowerCase().includes(filter.filter) ||
              job.numBill.toString().includes(filter.filter) ||
              job.numDeliveryNote.includes(filter.filter) ||
              job.numService.toString().includes(filter.filter) ||
              job.numberExternal.includes(filter.filter) ||
              job.numberInternal.includes(filter.filter) ||
              job.phoneOne.toString().includes(filter.filter) ||
              job.postalCode.toString().includes(filter.filter) ||
              job.province.toLowerCase().includes(filter.filter) ||
              job.status.toLowerCase().includes(filter.filter) ||
              job.client.nif?.toLowerCase().includes(filter.filter)
            )
          ) {
            didMatch = false;
          } else if(
              filter.type === 'status' &&
              job.status !== filter.filter
          ) {
            didMatch = false;
          }else if(
            filter.type === 'activity' &&
            !job.activities.includes(filter.filter)
            ) {
            didMatch = false;
          }else if(
            filter.type === 'client' &&
            job.client.numClient.toString() !== filter.filter.toString()
          ){
            didMatch = false;
          }else if(
            filter.type === 'year' &&
            !job.createdAt.toString().startsWith(filter.filter)
          ){
            didMatch = false;
          }else if(
            filter.type === 'month' &&
            job.createdAt.toString().split('-')[1] !== filter.filter
          ){
            didMatch = false;
          }
        })
        return didMatch;
      });
    };
  }
}
