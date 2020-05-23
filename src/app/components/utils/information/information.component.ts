import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  @Input() content: string;
  @Input() clas: string;

  constructor() { }

  ngOnInit(): void {
  }

}
