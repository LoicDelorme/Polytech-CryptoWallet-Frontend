import { Asset } from './asset';

export class Wallet {

  public id: number;
  public name: string;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;
  public assets: Array<Asset>;

  constructor(id: number, name: string, creationDate: Date, lastUpdate: Date, userId: number, assets: Array<Asset>) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
    this.assets = assets;
  }
}