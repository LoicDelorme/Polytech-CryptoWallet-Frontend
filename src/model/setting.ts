export class Setting {
  
  constructor(private id: number, private name: string, private theme: string, private creationDate: Date, private lastUpdate: Date, private userId: number) {
    this.id = id;
    this.name = name;
    this.theme = theme;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}