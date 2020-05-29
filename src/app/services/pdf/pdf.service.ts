import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  onExportClick(id: string, filename: string, type: string, orientation: string = 'landscape'){
    console.log(filename, id, orientation);
    const options = {
      filename,
      image: {type},
      html2canvas: {},
      jsPDF: {orientation}
    };

    const content: Element = document.getElementById(id);

    html2pdf().from(content).set(options).save();
  }
}
