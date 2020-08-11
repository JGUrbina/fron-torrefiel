import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {

  @Output () closeWindow = new EventEmitter();

  public year: string;
  public month: string;
  public alertShow: boolean = false;
  public alertUrlIcon: string;
  public alertHeader: string;
  public alertTitle: string;
  public alertSubtitle: string;
  private ALERTTIMESHOW: number = 3500;

  constructor(
    private service : ServiceService
  ) { }

  ngOnInit(): void {
  }

  downloadDataYear(){
    //console.log(this.year)

    if(this.year==undefined || this.year==''){
      return
    }else{
      this.service.downloadData(this.year, '').subscribe(data=>{
        let blob = new Blob([data], {  type: 'application/zip' });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          this.messageErrorCreate('Da permiso para descargar archivos');
          //alert( 'Please disable your Pop-up blocker and try again.');
        }
        console.log("data download", data)
      },err=>{
        console.log("error", err)
        if(err.status==404){
          this.messageErrorCreate('No hay archivos guardados en este año');
          //alert('No hay archivos guardados en este año');
        }
      })
    }
  }

  downloadDataMonth(){
    console.log("entre a download")
    if(this.year==undefined || this.year=='' || this.month==undefined || this.month==''){
      this.messageErrorCreate('Debes llenar ambos campos');
      //alert('Debes llenar ambos campos')
      return
    }else{
      this.service.downloadData(this.year, `-${this.month}`).subscribe(data=>{
        let blob = new Blob([data], {  type: 'application/zip' });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          this.messageErrorCreate('Da permiso para descargar archivos');
          //alert( 'Please disable your Pop-up blocker and try again.');
        }
        console.log("data download", data)
      },err=>{
        console.log("error", err)
        if(err.status==404){
          this.messageErrorCreate('No hay archivos guardados en este año');
          //alert('No hay archivos guardados en este año');
        }
      })
    }
  }

  messageErrorCreate(message: string){
    const urlIcon = '';
    const header = `Ha ocurrido un error`;
    const title = message;
    const subtitle = 'Intente nuevamente.';
    this.showAlert(urlIcon, header, title, subtitle);
  }

  showAlert(urlIcon: string, header: string, title: string, subtitle: string){
    this.alertUrlIcon = urlIcon;
    this.alertHeader = header;
    this.alertTitle = title;
    this.alertSubtitle = subtitle;
    this.alertShow = true;

    setTimeout(() => {
      this.alertShow = false;
    }, this.ALERTTIMESHOW);
  }


  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
