import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../model/cryptocurrency';
import { Response } from '../../model/response';

@Injectable()
export class CryptocurrenciesProvider {

  constructor(public http: HttpClient) {
  }

  public all(): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>("cryptowallet/unregistered/cryptocurrency");
  }

  public get(id: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>("cryptowallet/unregistered/cryptocurrency/" + id);
  }
}