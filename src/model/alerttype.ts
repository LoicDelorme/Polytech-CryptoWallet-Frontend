export class AlertType {

  public id: number;
  public name: string;
  public creationDate: Date;
  public lastUpdate: Date;

  constructor(id: number, name: string, creationDate: Date, lastUpdate: Date) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
  }
}