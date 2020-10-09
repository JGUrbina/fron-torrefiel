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
public totalIngresos: number

public clients: any
public allservice: any
public activitiesServices: any
public mostUsedActivity: any

  constructor(
    private services : ServiceService,
    private userService : UserService,
    private clientService : ClientService
  ) { 
    this.array= []
    this.cont = 0
    this.mostUsedActivity  = []
    this.totalIngresos = 0
  }

ngOnInit() {
  this.mostUsedState() 
   this.userWithMoreJobs()
   this.clientsWithMoreServices()
   this.mostRequestedActivities()
   this.ingresosTotales()
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
  mostUsedState() {
   
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
      },
       err => { console.log(err)}
    )
  }
  
 
  userWithMoreJobs(){
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

  clientsWithMoreServices() {
  this.clientService.getClients().subscribe(
    data => {
    this.clients =  data.sort(((a, b) => a.services.length - b.services.length)).slice(-4).reverse()
    // this.clients.forEach(client => console.log(client.services.length, this.allservice.length ))
      // console.log(this.clients)
    },
    err => {
      console.log(err)
    }
  )
}
mostRequestedActivities() {
  
  this.services.getServices().subscribe(
    data => {
      let arrayAux = []
        let arrayActivities = []
      data.services.forEach(service => {
        
        if(arrayActivities.length < 1) {
          arrayActivities = service.activities
          
        }else {
          arrayActivities = arrayActivities.concat(service.activities)
        }
        
      })
      const obj = arrayActivities.reduce((countActivities, activitie) => {
        countActivities[activitie] = (countActivities[activitie] || 0) + 1
        return countActivities
      },{})
      
      for (var key in obj) {
        arrayAux.push({activitie: key, count: obj[key]})
      }
      let aux = arrayAux.sort(((a, b) => a.count - b.count)).slice(-3).reverse()
      this.percentageOfJobsByActivity(aux, this.allservice)
     
    },
    err => {
      console.log('Error: hubo un problema al traer los servicios en la funcion mostRequestedActivities()', err)
    }
  )

}


percentageOfJobsByActivity(activities, services) {
  let pos1= 0, pos2= 0,pos3=0
  
  services.forEach(service => {
    
    for(let i = 0; i < service.activities.length; i++) {
      if(service.activities[i] == activities[0].activitie) {
        pos1++
      }
      if(service.activities[i] == activities[1].activitie) {
        pos2++
      }
      if(service.activities[i] == activities[2].activitie) {
        pos3++
      }
    }
  })
  let post = [pos1 *100/services.length,pos2 *100/services.length,pos3 *100/services.length]
  for(let i = 0; i < activities.length; i++) {
    this.mostUsedActivity.push({activity: activities[i].activitie, persentageService: post[i].toFixed(0)  })
  }
  console.log(this.mostUsedActivity)
}

ingresosTotales() {
  this.services.getServices().subscribe(
    data => {
      data.services.forEach(service => {
        console.log('Total Ingresos',service.amoun)
      });
      })
      
}

}
