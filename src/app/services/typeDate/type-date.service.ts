import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeDateService {

  constructor() { }

  generateDate(fecha: any, hour: any): string{
    if(fecha === null || hour === null) fecha = ''; hour = ''
    fecha = fecha.toString().slice(0, 10);
    
    fecha += ` ${hour}`;

    return fecha;
  }

  generateDateOnly(fecha: any): string{
    if(fecha  === null) fecha = ''
    return fecha.toString().slice(0, 10);
    return fecha;
  }
}
