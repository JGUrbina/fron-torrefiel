import { Component, NgModule, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ServiceService } from 'src/app/services/service/service.service';
import { JobComponent } from '../job/job.component';

// cosos

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
  public totalJobs: number;
  public page: number;
  


  constructor(
    private serviceService: ServiceService
    


  ) { }

  ngOnInit(): void {
    this.getDataService();
    this.searchFilters = [];
  }

  ngOnChanges(): void {
    this.handleFilters();
  }

  updateJobsFromChilds(data) {
    data.reverse();
    this.allJobs = data;
  }

  getDataService(): void {
    console.log('aquí')
    this.serviceService.getServices().subscribe(
      (data) => {
        data.services.reverse();
        this.allJobs = data.services;
        console.log('all jobs');
        this.filteredJobs = this.allJobs;
        this.totalJobs = this.allJobs.length;
        this.years.emit(data.years);
      },
      (err) => {
        console.error('Error: \n', err);
      }
    );
  }






  // filters ----------------------

  fullName(job: any): string {
    return `${job.name ? job.name : ''} ${job.lastName ? job.lastName : '' } ${job.motherLastName ? job.motherLastName : ''}`;
  }
  fullDirection(job: any): string{
    return `${job.direction ? job.direction : ''} ${job.numberExternal ? job.numberExternal : ''} ${job.numberInternal ? job.numberInternal : ''} ${job.province ? job.province : ''} ${job.municipality ? job.municipality : ''}`
  }

  handleFilters(): void {
    if (!this.searchFilters) return;
    const validFilters = this.searchFilters.filter(filter => filter.filter.length > 0);
    console.log({ validFilters });
    if (validFilters.length === 0) {
      this.filteredJobs = this.allJobs;
    } else {
    
    //  console.log(this.allJobs[0])

      this.filteredJobs = this.allJobs.filter(job => {

        let didMatch = true;

        validFilters.map(filter => {
          if (filter.type === 'keywords') {
            let fullName = this.fullName(job);
            let fullDirection = this.fullDirection(job)
            if (
              !(job.description.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.client?.name?.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                fullName.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                fullDirection.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.activities.includes(filter.filter?.toLowerCase()) ||
                job.email.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.numBill?.toString().replace(/ /g, "").includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.numDeliveryNote.replace(/ /g, "").includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.numService?.toString().replace(/ /g, "").includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.phoneOne?.toString().replace(/ /g, "").includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.postalCode.toString().replace(/ /g, "").includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.status.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()) ||
                job.client.nif?.replace(/ /g, "").toLowerCase().includes(filter.filter?.replace(/ /g, "").toLowerCase()))
            ) {
              didMatch = false;
            }
          } else if (
            filter.type === 'status' &&
            job.status !== filter.filter
          ) {
            didMatch = false;
          } else if (
            filter.type === 'activity' &&
            !job.activities.includes(filter.filter)
          ) {
            didMatch = false;
          } else if (
            filter.type === 'client' &&
            job.client.numClient.toString() !== filter.filter.toString()
          ) {
            didMatch = false;
          } else if (
            filter.type === 'year' &&
            !job.createdAt.toString().startsWith(filter.filter)
          ) {
            didMatch = false;
          } else if (
            filter.type === 'month' &&
            job.createdAt.toString().split('-')[1] !== filter.filter
          ) {
            didMatch = false;
          }
        })
        
        return didMatch;
      });
    };
  }
}
