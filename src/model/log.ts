export class Log {
  
  public id: number;
  public ipAddress: string;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;

  constructor(id: number, ipAddress: string, creationDate: Date, lastUpdate: Date, userId: number) {
    this.id = id;
    this.ipAddress = ipAddress;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}