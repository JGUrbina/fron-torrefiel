import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import { TypeDateService } from 'src/app/services/typeDate/type-date.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { Client } from 'src/app/models/client/client';
import { DropDownOptionsService } from '../../../services/dropDownOptions/drop-down-options.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { CKEditorModule } from 'ng2-ckeditor';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() public job: Service;
  @Input() public clientData: any;

  @Output() serviceToViews: EventEmitter <Service> = new EventEmitter();

  @ViewChild(ScheduleComponent ) child : ScheduleComponent ;
  @ViewChild(CKEditorModule ) ckEditor : CKEditorModule ;

  public optionsActivities: string[];
  public optionsStatus: string[];
  public optionsProvince: string[];
  public optionsMunicipality: string[];

  public nameClient: string;
  public nameWorker: string[] = [];
  public worker: string[] = [];
  public clientWhoContractsTheService: string;

  //edits
  public edit = {
    names: false, 
    status: false,
    directions: false,
    amount: false,
    description: false,
    bill: false,
    activities: false,
    iva: false
  }

 

  public keep = {
    input1: false,
    input2: false,
    input3: false,
    direction1: false,
    direction2: false,
    direction3: false,
    direction4: false,
    direction5: false
  };
  // views
  public DELIVERYNOTE: string = 'delivery note';
  public BILL: string = 'bill';
  public CALENDAR: string = 'calendar';
  public CHAT: string = 'chat';
  public IMAGES: string = 'images';
  public FIRM: string = 'firm';
  public NOTE: string = 'note';

  //services

  public sectionMenuShow: string;

  //multiselect
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownFlag = 0;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private typeDateService: TypeDateService,
    private dropDownOptions: DropDownOptionsService,
    private serviceService: ServiceService
  ) {
    this.optionsActivities = this.dropDownOptions.getActivities();
    this.optionsStatus = this.dropDownOptions.getStatus();
    this.optionsProvince = this.dropDownOptions.getProvince();
    this.optionsMunicipality = this.dropDownOptions.getMunicipality('Castellón/Castelló');
    this.sectionMenuShow = '';
    //dropdown
    this.dropdownList = this.dropDownOptions.getActivities();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      enableCheckAll: false
    };
   }

  ngOnInit(): void {
    
    this.selectedItems = this.job.activities;
    // this.serviceService.initSocket();
    this.clientWhoContractsTheService = `${this.job.client.name}`
  }

 

  close(input: string): void{
    this.sectionMenuShow = input;
  }
  receiveDataFromChild(data) {
    this.serviceToViews.emit(data);
}
  getDate(date: any){
    // console.log('fecha------------------>', date)
    // return date
    return this.typeDateService.generateDateOnly(date);
  }

  requestJobChanges(){
    
    console.log(this.job)
    this.serviceService.updateService(this.job._id, this.job).subscribe(
      data => {
       
        this.serviceService.editNotifications(this.job.numService,this.job.workers)
        this.job = data;
      }, err => console.log('err', err)
    )
  }

  submitJobStatus(){
    this.requestJobChanges();
    this.edit.status = false;
  }

  submitJobNames(){
    if(this.keep.input1 || this.keep.input2 || this.keep.input3){
      //console.log('a true');
      this.edit.names = true;
    }else {
        //console.log('a false');
        this.requestJobChanges();
        this.edit.names = false;
    };
    this.keep.input1 = false;
    this.keep.input2 = false;
    this.keep.input3 = false;
  }

  submitJobDirections(){
    if(this.keep.direction1 || this.keep.direction2 || this.keep.direction3 || this.keep.direction4 || this.keep.direction5){
      //console.log('a true');
      this.edit.directions = true;
    }else {
        //console.log('a false');
        this.requestJobChanges();
        this.edit.directions = false;
    };
    this.keep.direction1 = false;
    this.keep.direction2 = false;
    this.keep.direction3 = false;
    this.keep.direction4 = false;
    this.keep.direction5 = false;
  }

  submitJobAmount(){
    this.requestJobChanges();
    this.edit.amount = false;
  }

  submitJobBill(){
    
    this.requestJobChanges();
    this.edit.bill = false;
    //console.log('job', this.job)
  }

  submitJobDescription(){
    this.requestJobChanges();
    this.edit.description = false;
  }

  submitNewPriority(){
    //console.log('priority')
    this.job.priority = this.job.priority ? 'false' : 'true';
    this.requestJobChanges();
  }

  submitJobActivities(){
    this.dropdownFlag++;
    if(this.dropdownFlag > 1){
      this.edit.activities = false;
      this.dropdownFlag = 0;
      this.job.activities = this.selectedItems;
    }
    this.requestJobChanges();
  }

  submitJobIva() {
    this.requestJobChanges();
    this.edit.iva = false;
  }
}