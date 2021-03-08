export class Service {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public numService: number;
  public numDeliveryNote: string;
  public numBill: number;
  public description: string;
  public note: string;
  public status: string;
  public activities: string[];
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
  public postalCode: number;
  public client: any;
  public workers: any;
  public name: string;
  public lastName: string;
  public motherLastName: string;
  public email: string;
  public phoneOne: number;
  public phoneTwo: number;
  public signUrl: string;
  public nif: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    activities: string[],
    amount: number,
    numService: number,
    numBill: number,
    description: string,
    note: string,
    status: string,
    priority: string,
    startDate: any,
    startHours: any,
    workers: any,
    client: any,
    direction: string,
    numberExternal: string,
    numberInternal: string,
    province: string,
    municipality: string,
    postalCode: number,
    typeIva: number,
    name: string,
    lastName: string,
    motherLastName: string,
    email: string,
    phoneOne: number,
    phoneTwo: number,
    signUrl: string,
    nif: string,
    createdAt: Date,
    updatedAt: Date
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
    this.postalCode = postalCode;
    this.typeIva = typeIva;
    this.name = name;
    this.lastName = lastName;
    this.motherLastName = motherLastName;
    this.email = email;
    this.phoneOne = phoneOne;
    this.phoneTwo = phoneTwo;
    this.signUrl = signUrl;
    this.nif = nif;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
