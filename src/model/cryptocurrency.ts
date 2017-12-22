export class Cryptocurrency {

  constructor(private id: number, private name: string, private symbol: string, private imageUrl: string, private baseUrl: string, private resourceUrl: string, private creationDate: Date, private lastUpdate: Date) {
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