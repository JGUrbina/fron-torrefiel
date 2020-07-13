import { Component, OnInit, Output, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';
import { Client } from '../../../models/client/client'
import { Service } from '../../../models/service/service'

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss']
})
export class DeliveryNoteComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input() client: Client
  @Input() service: Service

  public exportPdfChangeClass: boolean = false;

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.exportPdfChangeClass = true;
    // agregar un loading para que no se vea el cambio de ancho
    this.pdfService.onExportClick('pdf_albaran_idUser', 'factura', '');
    setTimeout(() => {
      this.exportPdfChangeClass = false;
    }, 2000);
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
