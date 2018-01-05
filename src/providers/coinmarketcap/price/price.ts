import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../../entities/cryptocurrency';
import { CoinMarketCapResponse } from '../../../responses/coinmarketcapresponse';

@Injectable()
export class PriceCoinMarketCapProvider {

  public static readonly allPricesPath: string = "coinmarketcap/RESOURCE_URL/";
  public static readonly allPricesBetweenPath: string = "coinmarketcap/RESOURCE_URL/START_DATE/END_DATE/";

  constructor(private http: HttpClient) {
  }

  public allPrices(cryptocurrency: Cryptocurrency): Observable<CoinMarketCapResponse> {
    return this.http.get<CoinMarketCapResponse>(PriceCoinMarketCapProvider.allPricesPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl));
  }

  public allPricesBetween(cryptocurrency: Cryptocurrency, startDate: string, endDate: string): Observable<CoinMarketCapResponse> {
    return this.http.get<CoinMarketCapResponse>(PriceCoinMarketCapProvider.allPricesBetweenPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl).replace("START_DATE", startDate).replace("END_DATE", endDate));
  }
}