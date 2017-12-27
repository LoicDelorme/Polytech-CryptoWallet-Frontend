import { Cryptocurrency } from "./cryptocurrency";

export class Asset {

  public walletId: number;
  public cryptocurrency: Cryptocurrency;
  public amount: number;
  public purchasePrice: number;

  constructor(walletId: number, cryptocurrency: Cryptocurrency, amount: number, purchasePrice: number) {
    this.walletId = walletId;
    this.cryptocurrency = cryptocurrency;
    this.amount = amount;
    this.purchasePrice = purchasePrice;
  }
}