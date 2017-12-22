export class Favorite {

  constructor(private cryptocurrencyId: number, private userId: number){
    this.cryptocurrencyId = cryptocurrencyId;
    this.userId = userId;
  }
}