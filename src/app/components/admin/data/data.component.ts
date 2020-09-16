import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ServiceService } from 'src/app/services/service/service.service'
import { ClientService } from 'src/app/services/client/client.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
public array: any
public nickName: any
public numWorks: any
public masRepetida: string
public cont: number
public arr: any
public clients: any
public allservice: any

  constructor(
    private services : ServiceService,
    private userService : UserService,
    private clientService : ClientService
  ) { 
    this.array= []
    this.arr = []
    this.cont = 0
  }

ngOnInit() {
  this.allService() 
   this.userWorks()
   this.allClient()
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
  allService() {
   
    this.services.getServices().subscribe(
      data => {
        this.allservice = data.services
        let all = 0
        data.services.forEach(service => {
          
          this.array += (service.status + '-')
          
        })
        all =  this.array.split('-').length - 1
       this.masRepetida = this.array.split('-').sort((a,b) => this.array.split('-').filter(v => v===a).length
        - this.array.split('-').filter(v => v===b).length).pop()
        let cont = this.array.split('-').filter(s => s=== this.masRepetida).length
        this.cont = (cont * 100 / all)
        this.cont.toFixed(3)
        console.log(this.masRepetida, this.cont)
      },
       err => { console.log(err)}
    )
  }
  
 
  userWorks(){
    this.userService.getUsers().subscribe(
      data => {
        let user = data.sort(((a, b) => a.works.length - b.works.length))[data.length-1]
       this.nickName = user.userName
       this.numWorks =  user.works.length
      }, err => {
        console.log(err)
      }
    )
  }

allClient() {
  this.clientService.getClients().subscribe(
    data => {
    this.clients =  data.sort(((a, b) => a.services.length - b.services.length)).slice(-4).reverse()
    this.clients.forEach(client => console.log(client.services.length, this.allservice.length ))
      // console.log(this.clients)
    },
    err => {
      console.log(err)
    }
  )
}


}
