export class Service {
  constructor(
    public numService: number,
    public numDeliveryNote: number,
    public numBill: number,
    public description: string,
    public descriptionShort: string,
    public note: string,
    public status: string,
    public activities: string,
    public priority: string,
    public amount: number,
    public startDate: any,
    public startHours: any,
    public finalized: any,
    public client: any,
    public workers: any,
  ){
  }
}
