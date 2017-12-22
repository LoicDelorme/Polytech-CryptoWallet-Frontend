export class AlertType {
  
  constructor(private id: number, private name: string, private creationDate: Date, private lastUpdate: Date) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }
}