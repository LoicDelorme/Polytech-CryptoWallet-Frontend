import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorCryptocurrencyProvider {

  public static readonly allCryptocurrenciesPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency";
  public static readonly getCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly insertCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency";
  public static readonly updateCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deleteCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public allCryptocurrencies(token: string): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(AdministratorCryptocurrencyProvider.allCryptocurrenciesPath);
  }

  public getCryptocurrency(token: string, cryptocurrencyId: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>(AdministratorCryptocurrencyProvider.getCryptocurrencyPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrencyId.toString()));
  }

  public insertCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Cryptocurrency>> {
    return this.http.post<Response<Cryptocurrency>>(AdministratorCryptocurrencyProvider.insertCryptocurrencyPath.replace("TOKEN", token), cryptocurrency);
  }

  public updateCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Cryptocurrency>> {
    return this.http.put<Response<Cryptocurrency>>(AdministratorCryptocurrencyProvider.updateCryptocurrencyPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), cryptocurrency);
  }

  public deleteCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Cryptocurrency>> {
    return this.http.delete<Response<Cryptocurrency>>(AdministratorCryptocurrencyProvider.deleteCryptocurrencyPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}