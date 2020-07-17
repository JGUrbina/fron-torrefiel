import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Service } from '../../../models/service/service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() startService: Date;
  @Input() hourService: any;
  @Input() user: any[];
  @Input() service: any;
  @Input() worker: any;

  public allUsers: User[];
  public newService: Service;
  public allEvents: any;
  public usersAssigned: any[];

  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.newService = new Service(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.allUsers = [];
    this.form = this.formBuilder.group({
      usersAssigned: new FormArray([]),
      dateService: new FormControl(new Date(this.newService.startDate).toISOString().slice(0, -1))
    })
   }
   get usersFormArray() {
    return this.form.controls.usersAssigned as FormArray;
  }
   private addCheckboxes() {
    this.allUsers.forEach(() => this.usersFormArray.push(new FormControl(false)));
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  
  setFormValues(){
    this.form.value.usersAssigned[0] = true;
    this.form.value.usersAssigned.forEach((checkbox, index) => {
      console.log('form')
      checkbox = true;
      if(this.allUsers[index]._id === "5f0f97cc6a012c00172dd9f2"){
      }
    });
  }

  getUserById(idsWorkers){
    let workers = []
    idsWorkers.forEach(id => {
      const filteredUser = this.allUsers.filter(user => user._id === id)[0];
      console.log('filtered', filteredUser.name);
    })
    return workers;
  }

  dateChange(){
  };

  generateDate(fecha: any, hour: any): string{
    fecha = fecha.toString().slice(0, 10);
    fecha += ` ${hour}`;

    return fecha;
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

  getAllUser(): void{
    this.userService.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        console.log('datausers', this.allUsers)
        this.service.workers ? this.getUserById(this.service.workers) : null;
        this.addCheckboxes();
        this.setFormValues();
      },
      (err) => {
        console.error('error: \n', err);
      }
    );
  }
  

  scheduleService(){
    let usersSelected = []
    //se iteran los usuarios existentes y en base al array de usuarios seleccionados
    //que devuelven true o false, se crea un nuevo arreglo declarado arriba como usersSelected
    //con los _ids a asignar de los usuarios a los servicios
    this.allUsers.forEach((user, index) => this.form.value.usersAssigned[index] ? usersSelected.push(user._id) : null);
    console.log('selected', usersSelected);
    console.log('ya checkeados', this.form)
  }
}
