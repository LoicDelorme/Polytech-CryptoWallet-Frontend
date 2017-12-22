export class Log {
  
  constructor(private id: number, private ipAddress: string, private creationDate: Date, private lastUpdate: Date, private userId: number) {
    this.id = id;
    this.ipAddress = ipAddress;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
  }
}