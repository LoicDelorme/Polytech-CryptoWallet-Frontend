import { Asset } from './asset';
import { User } from './user';

export class Setting {
  constructor(private id:number, private name:string, private creationDate:Date, private lastUpdate:Date, private user:User, private assets:Array<Asset>){
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.user = user;
    this.assets = assets;
  }
}
