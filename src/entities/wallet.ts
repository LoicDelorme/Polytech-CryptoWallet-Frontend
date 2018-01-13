import { Asset } from './asset';

export class Wallet {

  public id: number;
  public name: string;
  public creationDate: string;
  public lastUpdate: string;
  public userId: number;
  public assets: Array<Asset>;

  constructor() {}
}