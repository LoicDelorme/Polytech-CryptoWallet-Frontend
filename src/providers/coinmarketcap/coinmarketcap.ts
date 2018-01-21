import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CoinMarketCapTickerResponse } from '../../responses/coinmarketcaptickerresponse';
import { CoinMarketCapGraphsResponse } from '../../responses/coinmarketcapgraphsresponse';

@Injectable()
export class CoinMarketCapProvider {

  private readonly getPricePath: string = "https://api.coinmarketcap.com/v1/ticker/RESOURCE_URL/";
  private readonly allPricesPath: string = "https://graphs2.coinmarketcap.com/currencies/RESOURCE_URL/";
  private readonly allPricesBetweenPath: string = "https://graphs2.coinmarketcap.com/currencies/RESOURCE_URL/START_DATE/END_DATE/";

  constructor(private http: HttpClient) {}

  public getPrice(cryptocurrency: Cryptocurrency): Observable<CoinMarketCapTickerResponse> {
    return this.http.get<CoinMarketCapTickerResponse>(this.getPricePath.replace("RESOURCE_URL", cryptocurrency.resourceUrl));
  }

  public allPrices(cryptocurrency: Cryptocurrency): Observable<CoinMarketCapGraphsResponse> {
    return this.http.get<CoinMarketCapGraphsResponse>(this.allPricesPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl));
  }

  public allPricesBetween(cryptocurrency: Cryptocurrency, startDate: string, endDate: string): Observable<CoinMarketCapGraphsResponse> {
    return this.http.get<CoinMarketCapGraphsResponse>(this.allPricesBetweenPath.replace("RESOURCE_URL", cryptocurrency.resourceUrl).replace("START_DATE", startDate).replace("END_DATE", endDate));
  }
}