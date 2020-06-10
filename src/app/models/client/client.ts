export class Client {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public numClient: number;
  public nif: string;
  public name: string;
  public nameCompany: string;
  public lastName: string;
  public motherLastName: string;
  public phoneOne: number;
  public phoneTwo: number;
  public email: string;
  public services: any;

  public direction: string;
  public numberExternal: number;
  public numberInternal: number;
  public province: string;
  public municipality: string;
  public postalcode: number;

  constructor(
    numClient: number,
    nif: string,
    name: string,
    nameCompany: string,
    lastName: string,
    motherLastName: string,
    email: string,
    phoneOne: number,
    phoneTwo: number,
    direction: string,
    numberExternal: number,
    numberInternal: number,
    province: string,
    municipality: string,
    postalcode: number,
  ){
    this.numClient = numClient;
    this.nif = nif;
    this.name = name;
    this.nameCompany = nameCompany;
    this.lastName = lastName;
    this.motherLastName = motherLastName;
    this.postalcode = postalcode;
    this.phoneOne = phoneOne;
    this.phoneTwo = phoneTwo;
    this.email = email;
    this.direction = direction;
    this.province = province;
    this.municipality = municipality;
    this.numberExternal = numberExternal;
    this.numberInternal = numberInternal;
  }
}
