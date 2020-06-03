import { Component, OnInit, Output } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss']
})
export class DeliveryNoteComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_albaran_idUser', 'factura', '');
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
