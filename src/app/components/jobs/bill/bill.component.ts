import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  constructor(
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_factura_idUser', 'albaran', '');
  }

}
