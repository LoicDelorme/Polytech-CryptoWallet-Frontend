import { User } from './user';
import { Cryptocurrency } from './cryptocurrency';
import { AlertType } from './alerttype';

export class Alert {
  constructor(private id:number, private threshold:number, private isOneShot:boolean, private creationDate:Date, private lastUpdate:Date, private user:User, private cryptocurrency:Cryptocurrency, private type:AlertType){
    this.id = id;
    this.threshold = threshold;
    this.isOneShot = isOneShot;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.user = user;
    this.cryptocurrency = cryptocurrency;
    this.type = type;
  }
}
