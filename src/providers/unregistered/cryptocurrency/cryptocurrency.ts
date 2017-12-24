import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Response } from '../../../model/response';

@Injectable()
export class UnregisteredCryptocurrencyProvider {

  public static readonly allCryptocurrenciesPath: string = "cryptowallet/unregistered/cryptocurrency";
  public static readonly getCryptocurrencyPath: string = "cryptowallet/unregistered/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public allCryptocurrencies(): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(UnregisteredCryptocurrencyProvider.allCryptocurrenciesPath);
  }

  public getCryptocurrency(cryptocurrencyId: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>(UnregisteredCryptocurrencyProvider.getCryptocurrencyPath.replace("CRYPTOCURRENCY_ID", cryptocurrencyId.toString()));
  }
}