import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { Response } from '../../responses/response';

@Injectable()
export class UnregisteredCryptocurrencyProvider {

  private readonly allCryptocurrenciesPath: string = "cryptowallet/unregistered/cryptocurrency";
  private readonly getCryptocurrencyPath: string = "cryptowallet/unregistered/cryptocurrency/ID";

  constructor(private http: HttpClient) {}

  public allCryptocurrencies(): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(this.allCryptocurrenciesPath);
  }

  public getCryptocurrency(cryptocurrencyId: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>(this.getCryptocurrencyPath.replace("ID", cryptocurrencyId.toString()));
  }
}