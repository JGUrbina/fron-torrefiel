export class Client {
  constructor(
    public name: string,
    public direction: string,
    public province: string,
    public municipality: string,
    public postalcode: number,
    public phone: number,
    public email: string,
    public services: any,
  ){}
}
