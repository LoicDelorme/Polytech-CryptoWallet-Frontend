import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class UnregisteredCryptocurrencyProvider {

  private readonly allCryptocurrenciesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/unregistered/cryptocurrency";
  private readonly getCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/unregistered/cryptocurrency/ID";

  constructor(private http: HttpClient) {}

  public allCryptocurrencies(): Observable<CryptoWalletResponse<Array<Cryptocurrency>>> {
    return this.http.get<CryptoWalletResponse<Array<Cryptocurrency>>>(this.allCryptocurrenciesPath);
  }

  public getCryptocurrency(cryptocurrencyId: number): Observable<CryptoWalletResponse<Cryptocurrency>> {
    return this.http.get<CryptoWalletResponse<Cryptocurrency>>(this.getCryptocurrencyPath.replace("ID", cryptocurrencyId.toString()));
  }
}