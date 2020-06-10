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
  public typeIva: any;
  public startDate: any;
  public startHours: any;
  public finalized: any;
  public direction: string;
  public numberExternal: number;
  public numberInternal: number;
  public province: string;
  public municipality: string;
  public postalcode: number;
  public client: any;
  public workers: any;

  constructor(
    numService: number,
    numDeliveryNote: number,
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
    direction: string,
    numberExternal: number,
    numberInternal: number,
    province: string,
    municipality: string,
    postalcode: number,
  ){
    this.numService = numService;
    this.numDeliveryNote = numDeliveryNote;
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
  }
}
