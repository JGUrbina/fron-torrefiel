export class Service {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public numService: number;
  public numDeliveryNote: number;
  public numBill: number;
  public description: string;
  public note: string;
  public status: string;
  public activities: string;
  public priority: string;
  public amount: number;
  public typeIva: number;
  public startDate: any;
  public startHours: any;
  public finalized: any;
  public direction: string;
  public numberExternal: string;
  public numberInternal: string;
  public province: string;
  public municipality: string;
  public postalcode: number;
  public client: any;
  public workers: any;

  constructor(
    numService: number,
    numBill: number,
    description: string,
    note: string,
    status: string,
    activities: string,
    priority: string,
    amount: number,
    startDate: any,
    startHours: any,
    workers: any,
    client: any,
    direction: string,
    numberExternal: string,
    numberInternal: string,
    province: string,
    municipality: string,
    postalcode: number,
    typeIva: number
  ){
    this.client = client;
    this.numService = numService;
    this.numBill = numBill;
    this.description = description;
    this.note = note;
    this.status = status;
    this.activities = activities;
    this.priority = priority;
    this.amount = amount;
    this.startDate = startDate;
    this.startHours = startHours;
    this.workers = workers;
    this.direction = direction;
    this.province = province;
    this.municipality = municipality;
    this.numberExternal = numberExternal;
    this.numberInternal = numberInternal;
    this.postalcode = postalcode;
    this.typeIva = typeIva;
  }
}
