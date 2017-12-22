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

  public getId(): number {
    return this.id;
  }

  public getThreshold(): number {
    return this.threshold;
  }

  public isOneShot(): boolean {
    return this.oneShot;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getCryptocurrencyId(): number {
    return this.cryptocurrencyId;
  }

  public getTypeId(): number {
    return this.typeId;
  }
}