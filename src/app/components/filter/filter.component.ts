import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DropDownOptionsService } from 'src/app/services/dropDownOptions/drop-down-options.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output()emitSearchFilter = new EventEmitter<string>();

  @Input() years: string;

  public statusList: string[];
  public activitiesList: string[];
  public isCollapsed: boolean;
  public selectedYear;
  public allMonths;
  public currentYear;
  public currentMonth;


  constructor(
    private dropDownOptions: DropDownOptionsService
  )
  {
    this.isCollapsed = false;
    this.statusList = dropDownOptions.getStatus();
    this.activitiesList = dropDownOptions.getActivities();
    this.selectedYear = '';
    this.allMonths = this.getAllMonths();
  }

  getAllMonths(){
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
   // console.log('allmonths', this.allMonths);
  }

  handleMonth(data){
    const month = data.length < 2 ? '0' + data : data;
    const dateFilter = data.length < 1 ? `${this.selectedYear}-` : `${this.selectedYear}-${month}`;
    console.log('filter', dateFilter);
    this.emitSearchFilter.emit(dateFilter);
  }

  handleYear(data){
    this.emitFilter(data);
    this.selectedYear = data.replace('-', '');
  }

  emitFilter(data){
    this.emitSearchFilter.emit(data);
  }

}
