import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorCryptocurrencyProvider {

  private readonly allCryptocurrenciesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/cryptocurrency";
  private readonly getCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/cryptocurrency/ID";
  private readonly insertCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/cryptocurrency";
  private readonly updateCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/cryptocurrency/ID";
  private readonly deleteCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/cryptocurrency/ID";

  constructor(private http: HttpClient) {}

  public allCryptocurrencies(token: string): Observable<CryptoWalletResponse<Array<Cryptocurrency>>> {
    return this.http.get<CryptoWalletResponse<Array<Cryptocurrency>>>(this.allCryptocurrenciesPath.replace("TOKEN", token));
  }

  public getCryptocurrency(token: string, cryptocurrencyId: number): Observable<CryptoWalletResponse<Cryptocurrency>> {
    return this.http.get<CryptoWalletResponse<Cryptocurrency>>(this.getCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrencyId.toString()));
  }

  public insertCryptocurrency(token: string, cryptocurrencyForm: CryptocurrencyForm): Observable<CryptoWalletResponse<Cryptocurrency>> {
    return this.http.post<CryptoWalletResponse<Cryptocurrency>>(this.insertCryptocurrencyPath.replace("TOKEN", token), cryptocurrencyForm);
  }

  public updateCryptocurrency(token: string, cryptocurrencyForm: CryptocurrencyForm): Observable<CryptoWalletResponse<Cryptocurrency>> {
    return this.http.put<CryptoWalletResponse<Cryptocurrency>>(this.updateCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrencyForm.id.toString()), cryptocurrencyForm);
  }

  public deleteCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Cryptocurrency>> {
    return this.http.delete<CryptoWalletResponse<Cryptocurrency>>(this.deleteCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }
}