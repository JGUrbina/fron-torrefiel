import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.scss']
})
export class FirmComponent implements OnInit {

  public firmClient: any;

  constructor() { }

  ngOnInit(): void {
    this.firmClient = {
      url: 'https://static.vecteezy.com/system/resources/previews/000/537/800/non_2x/manual-signature-for-documents-on-white-background-hand-drawn-calligraphy-lettering-vector-illustration.jpg',
      name: 'firma de prueba',
      date: new Date()
    };
  }

}
