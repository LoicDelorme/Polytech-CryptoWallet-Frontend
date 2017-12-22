export class Setting {
  
  constructor(private id: number, private name: string, private theme: string, private creationDate: Date, private lastUpdate: Date, private userId: number) {
    this.id = id;
    this.name = name;
    this.theme = theme;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getTheme(): string {
    return this.theme;
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