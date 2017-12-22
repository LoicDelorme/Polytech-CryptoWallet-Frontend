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
}