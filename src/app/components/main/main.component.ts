import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public showView: string;
  public JOBS: string = 'jobs';
  public CREATESERVICE: string = 'createService';
  public ADMIN: string = 'admin';

  constructor() { }

  ngOnInit(): void {
    this.changeView(this.JOBS);
  }

  changeView(view: string): void {
    this.showView = view;
  }

}
