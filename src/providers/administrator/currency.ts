import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Currency } from '../../entities/currency';
import { CurrencyForm } from '../../forms/currencyform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorCurrencyProvider {

  private readonly allCurrenciesPath: string = "cryptowallet/administrator/TOKEN/currency";
  private readonly getCurrencyPath: string = "cryptowallet/administrator/TOKEN/currency/ID";
  private readonly insertCurrencyPath: string = "cryptowallet/administrator/TOKEN/currency";
  private readonly updateCurrencyPath: string = "cryptowallet/administrator/TOKEN/currency/ID";
  private readonly deleteCurrencyPath: string = "cryptowallet/administrator/TOKEN/currency/ID";

  constructor(private http: HttpClient) {}

  public allCurrencies(token: string): Observable<CryptoWalletResponse<Array<Currency>>> {
    return this.http.get<CryptoWalletResponse<Array<Currency>>>(this.allCurrenciesPath.replace("TOKEN", token));
  }

  public getCurrency(token: string, currencyId: number): Observable<CryptoWalletResponse<Currency>> {
    return this.http.get<CryptoWalletResponse<Currency>>(this.getCurrencyPath.replace("TOKEN", token).replace("ID", currencyId.toString()));
  }

  public insertCurrency(token: string, currencyForm: CurrencyForm): Observable<CryptoWalletResponse<Currency>> {
    return this.http.post<CryptoWalletResponse<Currency>>(this.insertCurrencyPath.replace("TOKEN", token), currencyForm);
  }

  public updateCurrency(token: string, currencyForm: CurrencyForm): Observable<CryptoWalletResponse<Currency>> {
    return this.http.put<CryptoWalletResponse<Currency>>(this.updateCurrencyPath.replace("TOKEN", token).replace("ID", currencyForm.id.toString()), currencyForm);
  }

  public deleteCurrency(token: string, currency: Currency): Observable<CryptoWalletResponse<Currency>> {
    return this.http.delete<CryptoWalletResponse<Currency>>(this.deleteCurrencyPath.replace("TOKEN", token).replace("ID", currency.id.toString()));
  }
}