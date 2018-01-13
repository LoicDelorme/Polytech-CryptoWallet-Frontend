import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Currency } from '../../entities/currency';
import { Response } from '../../responses/response';

@Injectable()
export class RegisteredCurrencyProvider {

  private readonly allCurrenciesPath: string = "cryptowallet/registered/TOKEN/currency";
  private readonly getCurrencyPath: string = "cryptowallet/registered/TOKEN/currency/ID";

  constructor(private http: HttpClient) {}

  public allCurrencies(token: string): Observable<Response<Array<Currency>>> {
    return this.http.get<Response<Array<Currency>>>(this.allCurrenciesPath.replace("TOKEN", token));
  }

  public getCurrency(token: string, currencyId: number): Observable<Response<Currency>> {
    return this.http.get<Response<Currency>>(this.getCurrencyPath.replace("TOKEN", token).replace("ID", currencyId.toString()));
  }
}