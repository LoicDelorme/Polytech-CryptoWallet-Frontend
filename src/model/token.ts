export class Token {
  
  constructor(private id: number, private value: string, private beginDate: Date, private endDate: Date, private creationDate: Date, private lastUpdate: Date, private userId: number) {
    this.id = id;
    this.value = value;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }

  public getId(): number {
    return this.id;
  }

  public getValue(): string {
    return this.value;
  }

  public getBeginDate(): Date {
    return this.beginDate;
  }

  public getEndDate(): Date {
    return this.endDate;
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