import { Component, OnInit, Output, Input} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service'
import { DomSanitizer } from '@angular/platform-browser'


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
  public imgs: any;
  public imgsPreview: any[];

  constructor(
    private domSanitizer: DomSanitizer,
    private service : ServiceService
  ) {
    this.imgsPreview = [];
     
   }



  ngOnInit(): void {
    this.getImages(this.id);
    console.log(this.allImages)
    
    
  }

  getImages(id){
    console.log("id", id)
    this.service.getImages(id).subscribe(
      data=>{
        
        if(data.length > 0 ){
        
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

    
    
  }
selectFile(event) {
  
  if(event != '') {
     this.imgs = event.target.files
    
    Array.from(this.imgs).forEach((img, index )=> {
      this.imgsPreview.push(this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)))
    });
    
  } else {
    this.imgsPreview = []
  }
}
uploadImgs(event) {
  let id = this.id;
  this.allImages.push({images: this.imgsPreview, description: event})
  const form = new FormData()
  form.append('description', event)
  for(let i =0; i < this.imgs.length; i++){
        form.append("images[]", this.imgs[i]);
    }
    
  this.service.addImages(id,form).subscribe(
    data => {
      console.log(data)
    }, err => {
      console.log('error al subir las images', err)
    }
  )
  this.selectFile('');
  var inputValue = (<HTMLInputElement>document.getElementById('text')).value = '';
  
  
}
  emitEvent(): void{
    this.closeWindow.emit('');
  }

}
