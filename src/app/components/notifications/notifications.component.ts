import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})


export class NotificationsComponent implements OnInit {
  public notificationVisible: boolean;


  constructor() { 
    this.notificationVisible = true;
  }

  ngOnInit(): void {
  }

  toggleVisible() {
    this.notificationVisible = !this.notificationVisible;
  }

}
