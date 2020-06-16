import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  onExportClick(id: string, filename: string, type: string, orientation: string = 'portrait'): any{
    console.log(filename, id, orientation);
    const options = {
      filename,
      image: {type: 'png', quality: 8 },
      html2canvas: {},
      jsPDF: {orientation, format: 'a4'},
      scale: 1
    };

    const content: Element = document.getElementById(id);

    html2pdf().from(content).set(options).save().then((data) => data);
  }
}
