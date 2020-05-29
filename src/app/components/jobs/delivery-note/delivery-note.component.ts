import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss']
})
export class DeliveryNoteComponent implements OnInit {

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_albaran_idUser', 'factura', '');
  }

}
