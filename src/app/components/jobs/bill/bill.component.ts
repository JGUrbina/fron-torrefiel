import { Component, OnInit, Output, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';
import { Client } from '../../../models/client/client'
import { Service } from '../../../models/service/service'

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Input() client = Client
  @Input() service = Service
  @Output () closeWindow = new EventEmitter();
  
  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_factura_idUser', 'albaran', '');
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
