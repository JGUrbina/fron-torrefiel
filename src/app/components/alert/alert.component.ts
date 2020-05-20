import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() public alertUrlIcon: string;
  @Input() public alertHeader: string;
  @Input() public alertTitle: string;
  @Input() public alertSubtitle: string;
  @Input() public alertShow: boolean;

  constructor() {
    this.alertShow = false;
  }

  ngOnInit(): void {
  }

}
