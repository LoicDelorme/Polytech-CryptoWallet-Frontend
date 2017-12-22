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

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSymbol(): string {
    return this.symbol;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getResourceUrl(): string {
    return this.resourceUrl;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }
}