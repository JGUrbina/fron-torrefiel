import { Component, OnInit, Output, Input} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

 
  @Output () closeWindow = new EventEmitter();
  @Input() id: string;
  

  public allImages: any[];
  public description: string;

  constructor(
    private service : ServiceService
  ) { }



  ngOnInit(): void {
    this.getImages(this.id);
  }

  getImages(id){
    console.log("id", id)
    this.service.getImages(id).subscribe(
      data=>{
        console.log("length", data.length)
        if(data.length > 0 ){
         // this.description = data[0].description
          this.allImages = data;
        }
        console.log("all Images", this.allImages)
      }, (err)=>{
        console.log("err", err)
      }
    )
  }

  downloadImages(): void{
    console.log("id", this.id);

   this.service.downloadImages(this.id).subscribe(data=>{
        let blob = new Blob([data], {  type: 'application/zip' });
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          //this.messageErrorCreate('De permiso para descargar archivos');
          //alert( 'Please disable your Pop-up blocker and try again.');
        }
        console.log("data download", data)
      },err=>{
        console.log("error", err)
        if(err.status==404){
          alert('No hay imagenes para descargar')
         // this.messageErrorCreate('No hay archivos guardados en este año');
          //alert('No hay archivos guardados en este año');
        }
      })

    
    /* const downloading = this.downloads.download({
      url,
      filename: `${title}.jpg`,
      conflictAction: 'uniquity'
    });

    downloading.then(
      (data: any) => {console.log(data); },
      (err: any) => {console.log(err); },
    ); */
  }

  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
