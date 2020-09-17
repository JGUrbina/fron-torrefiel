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
  public monto: any;
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 5000;

  constructor(
    private pdfService: PdfService
  ) { 
    this.emailPdf = '';
  }

  ngOnInit(): void {
    console.log('delivery', this.clientData.name);
    this.monto = (this.deliveryNoteData.amount + (this.deliveryNoteData.amount * this.deliveryNoteData.typeIva /100)).toFixed(2);
  }
  
  showAlert(urlIcon: string, header: string, title: string, subtitle: string){
    console.log("titulo y sub", title, subtitle)
    this.alertUrlIcon = urlIcon;
    this.alertHeader = header;
    this.alertTitle = title;
    this.alertSubtitle = subtitle;
    this.alertShow = true;

    setTimeout(() => {
      this.alertShow = false;
    }, this.ALERTTIMESHOW);
  }

  messageErrorCreate(message: string){
    const urlIcon = '';
    const header = `Ha ocurrido un error`;
    const title = message;
    const subtitle = 'Intente nuevamente';
    this.showAlert(urlIcon, header, title, subtitle);
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
          console.log("data pdf", data);
          this.emitEvent();
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

  onPrint(){
    let popupWinindow : any;
    console.log("monto", this.monto)
    popupWinindow = window.open('', '_blank');
    popupWinindow.document.open();
  
    popupWinindow.document.write(` 
    <!DOCTYPE html>
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
                .col-2{
              width: 20%;
              }
              .col-6{
              width: 60%;
              }
              
              .col-8{
              width: 80%;
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
                border: 1px solid rgb(127, 1, 126);
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
                          
                .data__contain--item2{
                  background-color: #fdff99;
                  color: black;
                  text-align: center;
                  border: 1px solid #7f017e;
                }
                .b-right{
                  border: 1px solid #7f017e;
                }
                .purple{
                  background-color: #7f017e;
                  color: white;
                  border: 1px solid black;
                }
                
                .b-left{
                  border-left: 1px solid  #7f017e;
                  border-right: 1px solid  #7f017e;
                }
                
                .b-bottom{
                  border-left: 1px solid  #7f017e;
                  border-bottom: 1px solid  #7f017e;
                }

                .right{
                  text-align: right !important;
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
    
              .texto{
                display: flex;
                text-align: left;
                min-height: 95px;
                
                }

                .b-right{
                border: 1px solid  #7f017e;
                }
                .right{
                  text-align: right;
                }
                .b-left{
                border-left: 1px solid  #7f017e;
                border-right: 1px solid  #7f017e;
                }
                
                .texto2{
                display: flex;
                text-align: left;
                .b-right{
                border: 1px solid  #7f017e;
                }
                .right{
                  text-align: right;
                }
                .b-left{
                border-left: 1px solid  #7f017e;
                border-right: 1px solid  #7f017e;
                }
                }
    

    
              .titulos-texto {
                text-align: center;
                display: flex;
              }
    

              body{
                height: 100%;
                width: 100%;
                font-family: Roboto, "Helvetica Neue", sans-serif;
              }
</style>
</head>
<body>
<div class="sectionPdf">
  
  <div class="sectionPdf__viewpdf " id="pdf_factura_idUser">
    <section class="pdf">
      <header class="pdf__header">
      <div class="title">
        <div>
        <h1 class="name">PERSIANAS Y TOLDOS</h1>
        </div>
        <div>
            <figure class="logo"><img src="assets/images/logo-color.png" alt="Torre fiel"></figure>
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
          <span><b>Fecha de emisión: </b> ${this.deliveryNoteData.startDate.split('T')[0].split('-').reverse().join('/')}</span>
        </div>
        <div class="data__contain--item"><span>N° Factura:</span></div>
         
        <div class="data__contain--item"><span> ${this.deliveryNoteData.numBill} </span></div>
        </div>
        <div class="data__contain">
        <div class="data__contain--item"><span><b>Cliente: </b>${ this.deliveryNoteData.name } ${ this.deliveryNoteData.lastName } ${ this.deliveryNoteData.motherLastName }</span></div>
        <div class="data__contain--item"><span>Teléfono 1:</span></div>
        <div class="data__contain--item"><span>${ this.deliveryNoteData.phoneOne }</span></div>
        </div>
        <div class="data__contain">
        <div class="data__contain--item"><span><b>Correo electronico: </b>${ this.deliveryNoteData.email }</span></div>
        <div class="data__contain--item"><span>Teléfono 2:</span></div>
        <div class="data__contain--item"><span>${ this.deliveryNoteData.phoneTwo }</span></div>
        </div>
        <div class="data__contain">
        <div class="data__contain--item"><span><b>Dirección trabajos: </b>${ this.deliveryNoteData.direction } #${ this.deliveryNoteData.numberExternal }</span></div>
        <div class="data__contain--item"><span>Población:  ${ this.deliveryNoteData.province } <br>${ this.deliveryNoteData.municipality }</span></div>
        <div class="data__contain--item"><span>C.P. ${ this.deliveryNoteData.postalCode}</span></div>
        </div>
      </section>
      <section class="info">
        <div class="info-title">
        <p><span>FACTURA</span></p>
        </div>

        <div>
        <div class="titulos-texto">
          <div class="bg-purple mb-0 col-2"><span>UND</span></div>
          <div class="bg-purple mb-0 col-6"><span>DESCRIPCIÓN</span></div>
          <div class="bg-purple mb-0 col-2"><span>PRECIO/UND</span></div>
          <div class="bg-purple mb-0 col-2"><span>SUBTOTAL</span></div>
        </div>
        <div class="texto">
          <div class="col-2 mb-0 b-right"><span>1</span></div>
          <div class="col-6 mb-0 b-right"><span>${ this.deliveryNoteData.description }</span></div>
          <div class="col-2 mb-0 right b-right"><span>${ this.deliveryNoteData.amount }€</span></div>
          <div class="col-2 mb-0 right b-right"><span>${ this.deliveryNoteData.amount }€</span></div>
        </div>
        <div class="data__contain">
          <div class="data__contain--item2  col-8"><span>IMPORTE TOTAL</span></div>
          <div class="data__contain--item2  col-2"><span>Base imp.:</span></div>
          <div class="col-2 right b-right"><span>${ this.deliveryNoteData.amount }€</span></div>
        </div>
        <div class="texto2">
          <div class="col-8 b-left"></div>
          <div class="data__contain--item2  col-2"><span>${this.deliveryNoteData.typeIva}% IVA:</span></div>
          <div class="col-2 right b-right"><span>${(this.deliveryNoteData.amount * this.deliveryNoteData.typeIva /100).toFixed(2)}€</span></div>
        </div>
        <div class="data__contain">
          <div class="col-8 b-left b-bottom"></div>
          <div class="data__contain--item2  col-2"><span>TOTAL</span></div>
          <div class="data__contain--item2 right col-2 purple"><span>${this.monto}€</span></div>
        </div>
        </div>
      </section>
    </main>
  </section>
 </div>
</div>
</body>
</html>
    `);
    setTimeout(function() {popupWinindow.print();},500);
    popupWinindow.document.close();
    popupWinindow.onfocus = function () { setTimeout(function () { popupWinindow.close(); }, 500); }
  }

  
  

}



   
