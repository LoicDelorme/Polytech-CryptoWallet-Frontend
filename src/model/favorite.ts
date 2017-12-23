export class Favorite {

  public cryptocurrencyId: number;
  public userId: number;

  constructor(cryptocurrencyId: number, userId: number){
    this.cryptocurrencyId = cryptocurrencyId;
    this.userId = userId;
  }
}