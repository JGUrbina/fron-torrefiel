export class User {

  constructor(
    // tslint:disable-next-line: variable-name
    public _id: string,
    public name: string,
    public password: string,
    public lastName: string,
    public motherLastName: string,
    public userName: string,
    public email: string,
    public phone: number,
    public works: [any],
    public messages: [any],
    public rol: string,
    public isVerify: boolean,
  ){
  }
}
