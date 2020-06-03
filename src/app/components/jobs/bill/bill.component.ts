import { Component, OnInit, Output } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

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
