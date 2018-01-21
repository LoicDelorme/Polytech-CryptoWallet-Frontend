import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Currency } from '../../entities/currency';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class RegisteredCurrencyProvider {

  private readonly allCurrenciesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/currency";
  private readonly getCurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/currency/ID";

  constructor(private http: HttpClient) {}

  public allCurrencies(token: string): Observable<CryptoWalletResponse<Array<Currency>>> {
    return this.http.get<CryptoWalletResponse<Array<Currency>>>(this.allCurrenciesPath.replace("TOKEN", token));
  }

  public getCurrency(token: string, currencyId: number): Observable<CryptoWalletResponse<Currency>> {
    return this.http.get<CryptoWalletResponse<Currency>>(this.getCurrencyPath.replace("TOKEN", token).replace("ID", currencyId.toString()));
  }
}