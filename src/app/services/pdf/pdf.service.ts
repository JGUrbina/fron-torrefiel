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
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {unit: 'in', format: 'letter', orientation},
    };

    const content: Element = document.getElementById(id);

    return html2pdf().from(content).set(options).save();
  }
}
