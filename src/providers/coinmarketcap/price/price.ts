import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../../entities/cryptocurrency';
import { CoinMarketCapResponse } from '../../../responses/coinmarketcapresponse';

@Injectable()
export class PriceCoinMarketCapProvider {

  constructor(private http: HttpClient) {
  }

  public allPrices(cryptocurrency: Cryptocurrency): Observable<CoinMarketCapResponse> {
    return this.http.get<CoinMarketCapResponse>("/coinmarketcap/" + cryptocurrency.resourceUrl);
  }
}