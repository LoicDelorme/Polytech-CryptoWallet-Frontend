import { User } from './user';

export class Setting {
  constructor(private id:number, private value:string, private beginDate:Date, private endDate:Date, private creationDate:Date, private lastUpdate:Date, private user:User){
    this.id = id;
    this.value = value;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.user = user;
  }
}
