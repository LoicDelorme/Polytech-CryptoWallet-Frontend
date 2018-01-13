import { Cryptocurrency } from "./cryptocurrency";

export class Asset {

  public walletId: number;
  public cryptocurrency: Cryptocurrency;
  public amount: number;
  public purchasePrice: number;

  constructor() {}
}