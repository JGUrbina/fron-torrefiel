import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Logeado: string;

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.Logeado = localStorage.getItem('some-key')
    //console.log(this.Logeado)
    if(this.Logeado==null){
      this.router.navigate(['/login']);
    }
  }

}
