export class Token {

  public id: number;
  public value: string;
  public beginDate: Date;
  public endDate: Date;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;

  constructor(id: number, value: string, beginDate: Date, endDate: Date, creationDate: Date, lastUpdate: Date, userId: number) {
    this.id = id;
    this.value = value;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}