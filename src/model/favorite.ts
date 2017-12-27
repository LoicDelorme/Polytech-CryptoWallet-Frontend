import { Cryptocurrency } from "./cryptocurrency";

export class Favorite {

  public cryptocurrency: Cryptocurrency;
  public userId: number;

  constructor(cryptocurrency: Cryptocurrency, userId: number){
    this.cryptocurrency = cryptocurrency;
    this.userId = userId;
  }
}