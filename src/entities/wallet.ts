import { Asset } from './asset';

export class Wallet {

  public id: number;
  public name: string;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;
  public assets: Array<Asset>;

  constructor() {
  }
}