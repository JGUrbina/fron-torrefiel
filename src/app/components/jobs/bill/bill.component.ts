import { Component, OnInit, Output, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';
import { Service } from 'src/app/models/service/service';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input () deliveryNoteData: Service;
  @Input () clientData: Client;

  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    console.log('delivery', this.deliveryNoteData)
  }

  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_factura_idUser', 'albaran', '');
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
