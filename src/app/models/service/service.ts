export class Service {
  constructor(
    public description: string,
    public status: string,
    public priority: string,
    public amount: number,
    public start: any,
    public finalized: any,
    public client: object,
    public workers: object,
  ){
  }
}
