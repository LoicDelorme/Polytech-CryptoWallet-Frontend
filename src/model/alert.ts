export class Alert {

  constructor(private id: number, private threshold: number, private oneShot: boolean, private active: boolean, private creationDate: Date, private lastUpdate: Date, private userId: number, private cryptocurrencyId: number, private typeId: number) {
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