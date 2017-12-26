export class Setting {

  public id: number;
  public name: string;
  public theme: string;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;

  constructor(id: number, name: string, theme: string, creationDate: Date, lastUpdate: Date, userId: number) {
    this.id = id;
    this.name = name;
    this.theme = theme;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}