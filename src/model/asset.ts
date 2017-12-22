export class Asset {
  
  constructor(private walletId: number, private cryptocurrencyId: number, private amount: number, private purchasePrice: number) {
    this.walletId = walletId;
    this.cryptocurrencyId = cryptocurrencyId;
    this.amount = amount;
    this.purchasePrice = purchasePrice;
  }

  public getWalletId(): number {
    return this.walletId;
  }

  public getCryptocurrencyId(): number {
    return this.cryptocurrencyId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getPurchasePrice(): number {
    return this.purchasePrice;
  }
}