import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-icon',
  templateUrl: './create-icon.component.html',
  styleUrls: ['./create-icon.component.scss']
})
export class CreateIconComponent implements OnInit {

  @Input() name: string;
  @Input() url: string;
  @Input() class: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    /* const domain = document.domain;

    this.matIconRegistry.addSvgIcon(
      `${this.name}`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`${domain}/${this.url}`)
    ); */
  }

}
