import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownOptionsService {

  constructor() { }

  getActivities(): string[]{
    return [
      'Reclamación no conformidad',
      'Contado',
      'Cobro mediante tarjeta SH',
      'Mantenimiento',
      'Persianas',
      'Toldos',
      'Servieléctrico',
      'Bricohogar',
      'Bricopersiandas',
      'Mosquiteras',
      'Ventanas',
      'Rejas',
      'Cerrajería',
      'Cortina técnica',
      'Reformas',
      'Automatismos',
      'Escribir opción.'
    ];
  }

  getStatus(): string[]{
    return [
      'Pendiente de cita',
      'Citado',
      'Visitado',
      'Pendiente de presupuesto',
      'Presupuesto entregado',
      'Presupuesto aceptado. Pdte. de formalizar.',
      'Trabajo facturado',
      'Trabajo terminado',
      'Material para pedir',
      'Material pedido a proveedor',
      'Material recibido',
      'Montaje citado',
    ];
  }

  getProvince(): string[]{
    return [
      'estado 1',
      'estado 2',
      'estado 3',
      'estado 4',
      'estado 5',
    ];
  }

  getMunicipality(): string[]{
    return [
      'municipio 1',
      'municipio 2',
      'municipio 3',
      'municipio 4',
      'municipio 5',
    ];
  }
}
