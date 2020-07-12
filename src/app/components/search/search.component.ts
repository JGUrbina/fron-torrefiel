import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter;

  /* public search: string = new FormControl(''); */

  constructor() { }

  ngOnInit(): void {
    /* this.search.valueChanges.subscribe( value => this.searchEmitter.emit(value) ); */
  }

}
