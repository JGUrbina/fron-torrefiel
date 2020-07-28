import { Component, OnInit, Output, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';
import { Service } from 'src/app/models/service/service';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss']
})
export class DeliveryNoteComponent implements OnInit {

  @Input () deliveryNoteData: Service;
  @Input () clientData: Client;

  @Output () closeWindow = new EventEmitter();

  public exportPdfChangeClass: boolean = false;
  public emailPdf: string;

  constructor(private pdfService: PdfService) { 
    this.emailPdf = '';
  }

  ngOnInit(): void {
    console.log('service', this.deliveryNoteData);
    console.log('clientData', this.clientData);
  }

  downloadPdf(): void{
    this.exportPdfChangeClass = true;
    // agregar un loading para que no se vea el cambio de ancho
    this.pdfService.onExportClick('pdf_albaran_idUser', 'albaran', '').save();
    setTimeout(() => {
      this.exportPdfChangeClass = false;
    }, 2000);
  }

  sendPdfToEmail(){
    const pdf = this.pdfService.onExportClick('pdf_albaran_idUser', 'albaran', '').outputPdf('blob');
    const email = this.emailPdf;

    pdf.then(data => {

      var pdfFormData = new FormData();
      pdfFormData.append('pdf', data);
      pdfFormData.append('email', email);
      this.pdfService.sendPdf('send', pdfFormData).subscribe(
        data => {
          console.log(data);
        }, 
        err => {
          console.log('error', err)
        }
      );
    });
    this.emailPdf = '';
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
