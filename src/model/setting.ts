import { User } from './user';

export class Setting {
  constructor(private id:number, private name:string, private theme:string, private creationDate:Date, private lastUpdate:Date, private user:User){
    this.id = id;
    this.name = name;
    this.theme = theme;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.user = user;
  }
}
