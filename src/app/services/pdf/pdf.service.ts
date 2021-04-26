import { Injectable } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlApiGlobal } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private headers: HttpHeaders = new HttpHeaders();
  private headersFormData: HttpHeaders = new HttpHeaders();
  public urlApi: string;

  constructor(
    private http: HttpClient
  ) 
  {
    this.urlApi = `${UrlApiGlobal}/pdf`;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token')); 
    this.headersFormData.append('Content-Type', 'multipart/form-data');
    this.headersFormData.append('Authorization', 'Bearer ' + localStorage.getItem('token')); 
  }

  onExportClick(id: string, filename: string, type: string, orientation: string = 'portrait'): any{
    const options = {
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: 
      { 
        scale: 2,
        dpi: 300,
        letterRendering: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: {unit: 'in', format: 'letter', orientation},
    };




    const content: Element = document.getElementById(id);
    return html2pdf().from(content).set(options);

  }

  sendPdf(path, body): Observable<any> {
    console.log('log')
    return this.http.put<any>(`${this.urlApi}/${path}`, body, { headers: this.headersFormData });
  }

}
