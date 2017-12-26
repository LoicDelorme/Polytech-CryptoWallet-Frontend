export class Cryptocurrency {

  public id: number;
  public name: string;
  public symbol: string;
  public imageUrl: string;
  public baseUrl: string;
  public resourceUrl: string;
  public creationDate: Date;
  public lastUpdate: Date;

  constructor(id: number, name: string, symbol: string, imageUrl: string, baseUrl: string, resourceUrl: string, creationDate: Date, lastUpdate: Date) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.imageUrl = imageUrl;
    this.baseUrl = baseUrl;
    this.resourceUrl = resourceUrl;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
  }
}