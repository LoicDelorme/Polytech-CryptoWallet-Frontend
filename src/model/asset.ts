import { Cryptocurrency } from './cryptocurrency';

export class Asset {
  constructor(private wallet:Wallet, private cryptocurrency:Cryptocurrency, private amount:number, private purchasePrice:number){
    this.wallet = wallet;
    this.cryptocurrency = cryptocurrency;
    this.amount = amount;
    this.purchasePrice = purchasePrice;
  }
}
