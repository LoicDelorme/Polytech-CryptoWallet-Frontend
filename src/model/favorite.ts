export class Favorite {

  constructor(private cryptocurrencyId: number, private userId: number){
    this.cryptocurrencyId = cryptocurrencyId;
    this.userId = userId;
  }

  public getCryptocurrencyId(): number {
    return this.cryptocurrencyId;
  }

  public getUserId(): number {
    return this.userId;
  }
}