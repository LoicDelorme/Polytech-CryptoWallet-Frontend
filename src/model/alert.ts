export class Alert {

  public id: number;
  public threshold: number;
  public oneShot: boolean;
  public active: boolean;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;
  public cryptocurrencyId: number;
  public typeId: number;

  constructor(id: number, threshold: number, oneShot: boolean, active: boolean, creationDate: Date, lastUpdate: Date, userId: number, cryptocurrencyId: number, typeId: number) {
    this.id = id;
    this.threshold = threshold;
    this.oneShot = oneShot;
    this.active = active;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
    this.cryptocurrencyId = cryptocurrencyId;
    this.typeId = typeId;
  }
}