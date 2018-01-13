import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorCryptocurrencyProvider {

  private readonly allCryptocurrenciesPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency";
  private readonly getCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/ID";
  private readonly insertCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency";
  private readonly updateCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/ID";
  private readonly deleteCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/cryptocurrency/ID";

  constructor(private http: HttpClient) {}

  public allCryptocurrencies(token: string): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(this.allCryptocurrenciesPath.replace("TOKEN", token));
  }

  public getCryptocurrency(token: string, cryptocurrencyId: number): Observable<Response<Cryptocurrency>> {
    return this.http.get<Response<Cryptocurrency>>(this.getCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrencyId.toString()));
  }

  public insertCryptocurrency(token: string, cryptocurrencyForm: CryptocurrencyForm): Observable<Response<Cryptocurrency>> {
    return this.http.post<Response<Cryptocurrency>>(this.insertCryptocurrencyPath.replace("TOKEN", token), cryptocurrencyForm);
  }

  public updateCryptocurrency(token: string, cryptocurrencyForm: CryptocurrencyForm): Observable<Response<Cryptocurrency>> {
    return this.http.put<Response<Cryptocurrency>>(this.updateCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrencyForm.id.toString()), cryptocurrencyForm);
  }

  public deleteCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Cryptocurrency>> {
    return this.http.delete<Response<Cryptocurrency>>(this.deleteCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }
}