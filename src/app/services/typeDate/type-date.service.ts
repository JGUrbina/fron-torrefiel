import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeDateService {

  constructor() { }

  generateDate(fecha: any, hour: any): string{
    fecha = fecha.toString().slice(0, 10);
    fecha += ` ${hour}`;

    return fecha;
  }

  generateDateOnly(fecha: any): string{
    return fecha.toString().slice(0, 10);
  }
}
