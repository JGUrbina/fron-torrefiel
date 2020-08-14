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

  onPrint(){
      let popupWinindow : any;
     
      popupWinindow = window.open('', '_blank');
      popupWinindow.document.open();
      popupWinindow.document.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pdf Content</title>
          <style>
              .sectionPdf__viewpdf{
                  background-color: rgb(255, 255, 255);
                  margin: 15px;
                  height: 90%;
                  overflow-y: auto;
                  overflow-x: hidden;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                }

                @page { 
                  margin: 0; 
                }
                
                .pdf{
                  padding: 15px;
                  width: 100%;
                  font-size: .7rem;
                  color: rgb(51, 51, 51);
                }
  
                .pdf__header{
                  margin-bottom: 30px;
                  font-size: .8rem;
                  display: flex;
                  justify-content: space-between;
                }
  
                .title{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                }
  
                .name{
                  font-size: 1rem;
                  font-weight: 400; 
                }
  
                .logo{
                  height: 86px;
                  margin-bottom: .5rem;
                }
  
                .info{
                  text-align: end;
                  font-size: .8rem;
                }
                
                .mb-3, .my-3 {
                  margin-bottom: 1rem !important;
                }
  
                img{
                  height: 100%;
                  object-fit: contain;
                  object-position: center;
                }
  
                .pdf__services{
                  margin-bottom: 27px;
                }
  
                .one, .two{
                  display: flex;
                  justify-content: space-between;
                }
  
                .one{
                  align-items: center;
                }
  
                .services-p{
                  text-align: center;
                  margin: 0;
                  width: 20%;
                  padding: 5px;
                  border: 1px solid rgb(0, 0, 0);
                }


                .purple{
                  background-color: rgb(127, 1, 126);
                  color: rgb(255, 255, 255);
                }

                .data{
                  margin-bottom: 20px;
                  background-color: rgb(253, 255, 153);
                }
  
                .data__contain{
                  display: flex;
                }
  
                .data__contain--item{
                  padding: 5px;
                  padding: 5px;
                  background-color: rgb(253, 255, 153);
                  color: rgb(127, 1, 126);
                  border: 1px solid rgb(127, 1, 126);
                  width: 20%;
                  text-align: center;
                }

                .data__contain--item:nth-child(1){
                  width: 60%;
                  text-align: left;
                }

                .info-title{
                  display: flex;
                  justify-content: center;          
                  font-weight: bold;
                  font-size: 1rem;
                }
  
                .bg-purple{
                  padding: 2px;
                  background-color: rgb(202, 154, 254);
                  border: 1px solid rgb(127, 1, 126);
                }
  
                .mb-0, .my-0 {
                  margin-bottom: 0;
                }
                
                .text, .importe{
                  padding: 2px;
                  min-height: 95px;
                  border: 1px solid rgb(127, 1, 126);
                }
  
                .text{
                  min-height: 190px;
                }
      
                .firma{
                  padding: 2px;
                  min-height: 95px;
                  border: 1px solid rgb(127, 1, 126);
                  text-align: center;
                }
      
                .titulos-texto {
                  text-align: center;
                }
      
                .img-firma{
                  width: 300px;
                  display: block;
                  margin: auto;
                }

                body{
                  height: 100%;
                  width: 100%;
                  font-family: Roboto, "Helvetica Neue", sans-serif;
                }

          </style>
      </head>
      <body>
          <div class="sectionPdf__viewpdf">
              <section class="pdf">
                <header class="pdf__header">
                  <div class="title">
                    <div>
                      <h1 class="name">PERSIANAS Y TOLDOS</h1>
                    </div>
                    <div>
                    <figure class="logo"><img src="../../../assets/images/logo-color.png" alt="Torre fiel"></figure>
                    </div>
                  </div>
                  <div class="info">
                    <div class="mb-3">
                      <span><b>Persionas y Toldos Torrefiel, CB</b></span><br>
                      <span>c/ Librero Esclapes, 2 Bajo dcha.</span><br>
                      <span>46019- Valencia</span><br>
                      <span>CIF: E97681472</span>
                    </div>
                    <div>
                      <span>Telf.: 961337760</span><br>
                      <span>963284410</span><br>
                      <span>Correo electrónico: <a href="mailto:info@mejorarhogar.com">info@mejorarhogar.com</a></span>
                    </div>
                  </div>
                </header>
                <section class="pdf__services">
                  <div class="one">
                    <p class="services-p purple">Persianas</p>
                    <p class="services-p">Toldos</p>
                    <p class="services-p purple">Ventanas</p>
                    <p class="services-p">Mosquiteras</p>
                    <p class="services-p purple">Electricidad</p>
                  </div>
                  <div class="two">
                    <p class="services-p ">Mamparas de<br>baño</p>
                    <p class="services-p purple">Decoración</p>
                    <p class="services-p ">Rejas</p>
                    <p class="services-p purple">Motorizaciones</p>
                    <p class="services-p ">Reparaciones<br> a domicilio</p>
                  </div>
                </section>
                <main class="pdf__main">
                  <section class="data">
                    <div class="data__contain">
                      <div class="data__contain--item">
                        <span><b>Fecha de emisión:</b> ${this.deliveryNoteData.startDate.split('T')[0]}</span>
                      </div>
                      <div class="data__contain--item"><span>N° albarán:</span></div>
                      <div class="data__contain--item"><span>${this.deliveryNoteData.numDeliveryNote}</span></div>
                    </div>
                    <div class="data__contain">
                      <div class="data__contain--item"><span><b>Cliente: </b>${this.deliveryNoteData.name} ${this.deliveryNoteData.lastName} ${this.deliveryNoteData.motherLastName}</span></div>
                      <div class="data__contain--item"><span>Teléfono 1:</span></div>
                      <div class="data__contain--item"><span>${this.deliveryNoteData.phoneOne}</span></div>
                    </div>
                    <div class="data__contain">
                      <div class="data__contain--item"><span><b>Correo electronico: </b>${this.deliveryNoteData.email}</span></div>
                      <div class="data__contain--item"><span>Teléfono 2:</span></div>
                      <div class="data__contain--item"><span>${this.deliveryNoteData.phoneTwo}</span></div>
                    </div>
                    <div class="data__contain">
                      <div class="data__contain--item"><span><b>Dirección trabajos: </b>${this.deliveryNoteData.direction} #${this.deliveryNoteData.numberExternal}</span></div>
                      <div class="data__contain--item"><span>Población: ${this.deliveryNoteData.province}<br>${this.deliveryNoteData.municipality}</span></div>
                      <div class="data__contain--item"><span>C.P. ${this.deliveryNoteData.postalCode}</span></div>
                    </div>
                  </section>
                  <section>
                    <div class="info-title">
                      <p><span>ALBARÁN</span></p>
                    </div>
                    <div>
                      <div class="titulos-texto">
                        <p class="bg-purple mb-0">
                          Descripción de trabajos realizados
                        </p>
                      </div>
                      <div class="text">
                        <span style="word-break: break-all;">${this.deliveryNoteData.description}</span>
                      </div>
                      <div class="titulos-texto">
                        <p class="bg-purple mb-0">
                          <b>Importe a facturar</b> por los trabajos realizados en esta visita
                        </p>
                      </div>
                      <div class="importe">
                        <span>${this.deliveryNoteData.amount}€</span>
                      </div>
                      <div class="titulos-texto">
                        <p class="bg-purple mb-0">
                          Firma
                        </p>
                      </div>
                      <div class="firma">
                      <figure class="logo"><img width="300px" src="${this.deliveryNoteData.signUrl}" ></figure>
                      </div>
                    </div>
                  </section>
                </main>
              </section>
            </div>
      </body>
      </html>
      </html>`);
   
      setTimeout(function() {popupWinindow.print();},500);
      popupWinindow.document.close();
      popupWinindow.onfocus = function () { setTimeout(function () { popupWinindow.close(); }, 500); }
       //popupWinindow.close();
    }

  emitEvent(): void{
    this.closeWindow.emit('');
  }
}
