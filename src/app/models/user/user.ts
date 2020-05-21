export class User {

  constructor(
    public _id: string,
    public name: string,
    public password: string,
    public lastName: string,
    public motherLastName: string,
    public userName: string,
    public email: string,
    public phone: number,
    public works: [any],
    public rol: string,
    public isVerify: boolean,
    public createdAt: any,
    public updatedAt: any,
  ){
    
  }
}
