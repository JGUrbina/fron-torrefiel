import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  public PROFILE: string = 'profile';
  public DATA: string = 'data';
  public SUMMARY: string = 'summary';
  public YEAR: string = 'summary-year'

  public view: string;

  constructor() {
    this.view = '';
  }

  ngOnInit(): void {
  }

  showView(view: string): void {
    this.view = view;
  }

  closeView(event: any): void{
    this.view = '';
  }

}
