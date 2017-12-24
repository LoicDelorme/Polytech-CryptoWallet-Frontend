import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Response } from '../../../model/response';

@Injectable()
export class UnregisteredCryptocurrencyProvider {

  public static readonly allPath: string = "cryptowallet/unregistered/cryptocurrency";
  public static readonly getPath: string = "cryptowallet/unregistered/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public all(): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(UnregisteredCryptocurrencyProvider.allPath);
  }

  public get(cryptocurrencyId: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>(UnregisteredCryptocurrencyProvider.getPath.replace("CRYPTOCURRENCY_ID", cryptocurrencyId.toString()));
  }
}