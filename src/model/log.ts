export class Log {
  
  constructor(private id: number, private ipAddress: string, private creationDate: Date, private lastUpdate: Date, private userId: number) {
    this.id = id;
    this.ipAddress = ipAddress;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }

  public getId(): number {
    return this.id;
  }

  public getIpAddress(): string {
    return this.ipAddress;
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
}