import { Injectable } from '@angular/core';
import { Cryptocurrency } from '../../model/cryptocurrency';

/*
  Generated class for the CryptocurrenciesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CryptocurrenciesProvider {

  cryptocurrencies : Cryptocurrency[] = [];

  constructor() {
    this.cryptocurrencies.push(new Cryptocurrency(1, "Bitcoin", "BTC", "https://files.coinmarketcap.com/static/img/coins/64x64/bitcoin.png", "https://graphs.coinmarketcap.com/currencies/", "bitcoin/", new Date(), new Date()));
    this.cryptocurrencies.push(new Cryptocurrency(2, "Ethereum", "ETH", "https://files.coinmarketcap.com/static/img/coins/64x64/ethereum.png", "https://graphs.coinmarketcap.com/currencies/", "ethereum/", new Date(), new Date()));
  }

  getAll() : Cryptocurrency[] {
    return this.cryptocurrencies;
  }
}