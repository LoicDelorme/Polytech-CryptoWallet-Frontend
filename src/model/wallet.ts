import { Asset } from './asset';

export class Wallet {
  
  constructor(private id: number, private name: string, private creationDate: Date, private lastUpdate: Date, private userId: number, private assets: Asset[]) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
    this.assets = assets;
  }
}