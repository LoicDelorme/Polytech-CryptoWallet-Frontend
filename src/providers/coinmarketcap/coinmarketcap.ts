import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { Ticker } from '../../entities/ticker';
import { Graphs } from '../../entities/graphs';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class CoinMarketCapProvider {

  private readonly getCurrentPricePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/coinmarketcap/ticker/RESOURCE_URL";
  private readonly allPricesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/coinmarketcap/graphs/RESOURCE_URL";
  private readonly allPricesBetweenPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/coinmarketcap/graphs/RESOURCE_URL/START_DATE/END_DATE";

  constructor(private http: HttpClient) {}

  public getCurrentPrice(cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Ticker>> {
    return this.http.get<CryptoWalletResponse<Ticker>>(this.getCurrentPricePath.replace("RESOURCE_URL", cryptocurrency.resourceUrl));
  }

  public allPrices(cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Graphs>> {
    return this.http.get<CryptoWalletResponse<Graphs>>(this.allPricesPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl));
  }

  public allPricesBetween(cryptocurrency: Cryptocurrency, startDate: string, endDate: string): Observable<CryptoWalletResponse<Graphs>> {
    return this.http.get<CryptoWalletResponse<Graphs>>(this.allPricesBetweenPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl).replace("START_DATE", startDate).replace("END_DATE", endDate));
  }
}