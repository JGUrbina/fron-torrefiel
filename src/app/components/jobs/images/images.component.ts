import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  public allImages: any[];

  constructor() { }

  ngOnInit(): void {
    this.allImages = [
      {url: 'https://geeksroom.com/wp-content/uploads/2019/07/carpintero-pixabay.jpg', name: 'prueba', date: new Date()},
      {url: 'https://www.aloreparaciones.cl/image/reparaciones-generales.jpg', name: 'test 2', date: new Date()},
      {url: 'https://geeksroom.com/wp-content/uploads/2019/07/carpintero-pixabay.jpg', name: 'test', date: new Date()},
      {url: 'https://www.todomecanica.com/images/blog/2017/junio/reparacion-taller.jpg', name: 'test 1', date: new Date()},
      {url: 'https://www.galiciae.com/media/galiciae/images/2017/06/22/herramientas.jpg', name: 'evento', date: new Date()},
      {url: 'https://geeksroom.com/wp-content/uploads/2019/07/carpintero-pixabay.jpg', name: 'asd', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://mbnoticias.es/wp-content/uploads/2019/05/Las-reparaciones-m%C3%A1s-frecuentes-en-el-hogar.jpg', name: 'asd dfdf', date: new Date()},
      {url: 'https://geeksroom.com/wp-content/uploads/2019/07/carpintero-pixabay.jpg', name: 'dfgfgfg', date: new Date()},
    ];
  }

  downloadImage(url: string, title: string): void{
    console.log(url, title);

    /* const downloading = browser.downloads.download({
      url,
      filename: `${title}.jpg`,
      conflictAction: 'uniquity'
    });

    downloading.then(
      (data: any) => {console.log(data); },
      (err: any) => {console.log(err); },
    ); */
  }

}
