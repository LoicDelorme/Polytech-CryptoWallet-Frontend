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

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getAssets(): Asset[] {
    return this.assets;
  }
}