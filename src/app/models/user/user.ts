export class User {

  // tslint:disable-next-line: variable-name
  public _id: string;
  public name: string;
  public password: string;
  public lastName: string;
  public motherLastName: string;
  public userName: string;
  public email: string;
  public phone: number;
  public works: [any];
  public messages: [any];
  public rol: string;
  public isVerify: boolean;

  constructor(
    name: string,
    password: string,
    lastName: string,
    motherLastName: string,
    userName: string,
    email: string,
    phone: number,
    works: [any],
    messages: [any],
    rol: string,
    isVerify: boolean,
  ){
    this.name = name;
    this.password = password;
    this.lastName = lastName;
    this.motherLastName = motherLastName;
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.works = works;
    this.messages = messages;
    this.rol = rol;
    this.isVerify = isVerify;
  }
}
