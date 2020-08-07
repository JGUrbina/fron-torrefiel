import { Component, OnInit, Output, Input } from '@angular/core';
import { PdfService } from '../../../services/pdf/pdf.service';
import { EventEmitter } from '@angular/core';
import { Service } from 'src/app/models/service/service';
import { Client } from 'src/app/models/client/client';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();
  @Input () deliveryNoteData: Service;
  @Input () clientData: Client;

  public emailPdf: string;
  constructor(
    private pdfService: PdfService
  ) { 
    this.emailPdf = '';
  }

  ngOnInit(): void {
    console.log('delivery', this.deliveryNoteData)
  }

 /*  onPrint(){
    window.print();
  } */
  

  printToCart(printSectionId: string){
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=800,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
  
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');

    popupWinindow.document.close();
  }

  
  downloadPdf(): void{
    this.pdfService.onExportClick('pdf_factura_idUser', 'factura', '').save();
  }

  sendPdfToEmail(){
    const pdf = this.pdfService.onExportClick('pdf_factura_idUser', 'factura', '').outputPdf('blob');
    const email = this.emailPdf;

    console.log('pdf', pdf)
    console.log('email', email)

    pdf.then(data => {
      console.log('inpromise')
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



   
