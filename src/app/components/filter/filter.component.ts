import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DropDownOptionsService } from 'src/app/services/dropDownOptions/drop-down-options.service';
import { debounceTime } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output()emitSearchFilters = new EventEmitter<{ type: string, filter: string }[]>();

  @Input() years: string;

  public statusList: string[];
  public activitiesList: string[];
  public isCollapsed: boolean;
  public selectedYear;
  public selectedMonth;
  public allMonths;
  public filterKeywords: string;
  public filterStatus: string;
  public filterActivity: string;
  public filterClient: string;
  public clients: Client


  constructor(
    private dropDownOptions: DropDownOptionsService,
    private clientService: ClientService
  )
  {
    this.isCollapsed = false;
    this.statusList = dropDownOptions.getStatus();
    this.activitiesList = dropDownOptions.getActivities();
    this.selectedYear = '';
    this.selectedMonth = '';
    this.allMonths = this.getAllMonths();
    this.filterKeywords = '';
    this.filterStatus = '';
    this.filterActivity = '';
    this.filterClient = '';
  }

  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  debounceTime = 500;

  getAllMonths(){
    return [
      { value: '01', text: 'Enero' }, 
      { value: '02', text: 'Febrero' }, 
      { value: '03', text: 'Marzo' }, 
      { value: '04', text: 'Abril' }, 
      { value: '05', text: 'Mayo' }, 
      { value: '06', text: 'Junio' }, 
      { value: '07', text: 'Julio' }, 
      { value: '08', text: 'Agosto' }, 
      { value: '09', text: 'Septiembre' }, 
      { value: '10', text: 'Octubre' }, 
      { value: '11', text: 'Noviembre' }, 
      { value: '12', text: 'Diciembre' }
    ];
  }

  ngOnInit(): void {
    this.fetchClients();
   // console.log('allmonths', this.allMonths);
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
      )
      .subscribe(() => {
        this.emitFilter();
      });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchClients() {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
      },
      err => console.log('err', err)
    );
  }

  handleMonth(data){
    const month = data.length < 2 ? '0' + data : data;
    const dateFilter = data.length < 1 ? `${this.selectedYear}-` : `${this.selectedYear}-${month}`;
    console.log('filter', dateFilter);
    //this.emitSearchFilters.emit(dateFilter);
  }

  inputChanged() {
    this.modelChanged.next("")
  }

  emitFilter(){
    console.log('emiting', this.selectedYear);
    this.emitSearchFilters.emit([
      {
        type: 'keywords',
        filter: this.filterKeywords
      },
      {
        type: 'status',
        filter: this.filterStatus
      },
      {
        type: 'activity',
        filter: this.filterActivity
      },
      {
        type: 'client',
        filter: this.filterClient
      },
      {
        type: 'year',
        filter: this.selectedYear
      },
      {
        type: 'month',
        filter: this.selectedMonth
      },
    ])
  }

}
