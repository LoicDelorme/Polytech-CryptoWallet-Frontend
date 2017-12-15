export class AlertType {
  constructor(private id:number, private name:string, private creationDate:Date, private lastUpdate:Date){
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
  }
}
