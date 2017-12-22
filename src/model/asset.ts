export class Asset {
  
  constructor(private walletId: number, private cryptocurrencyId: number, private amount: number, private purchasePrice: number) {
    this.walletId = walletId;
    this.cryptocurrencyId = cryptocurrencyId;
    this.amount = amount;
    this.purchasePrice = purchasePrice;
  }
}