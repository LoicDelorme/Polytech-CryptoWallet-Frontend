export class Asset {

  public walletId: number;
  public cryptocurrencyId: number;
  public amount: number;
  public purchasePrice: number;

  constructor(walletId: number, cryptocurrencyId: number, amount: number, purchasePrice: number) {
    this.walletId = walletId;
    this.cryptocurrencyId = cryptocurrencyId;
    this.amount = amount;
    this.purchasePrice = purchasePrice;
  }
}