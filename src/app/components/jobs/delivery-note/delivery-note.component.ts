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

  public exportPdfChangeClass: boolean = false;

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
  }

  downloadPdf(): void{
    this.exportPdfChangeClass = true;
    console.log(this.pdfService.onExportClick('pdf_albaran_idUser', 'factura', ''));
    this.pdfService.onExportClick('pdf_albaran_idUser', 'factura', '').subscribe(
      (data) => {
        console.log(data);
        this.exportPdfChangeClass = false;
      }
    );
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
