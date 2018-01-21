import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wallet } from '../../entities/wallet';
import { WalletForm } from '../../forms/walletform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorWalletProvider {

  private readonly allWalletsPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/wallet";
  private readonly getWalletPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/wallet/ID";
  private readonly insertWalletPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/wallet";
  private readonly updateWalletPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/wallet/ID";
  private readonly deleteWalletPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/wallet/ID";

  constructor(private http: HttpClient) {}

  public allWallets(token: string): Observable<CryptoWalletResponse<Array<Wallet>>> {
    return this.http.get<CryptoWalletResponse<Array<Wallet>>>(this.allWalletsPath.replace("TOKEN", token));
  }

  public getWallet(token: string, walletId: number): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.get<CryptoWalletResponse<Wallet>>(this.getWalletPath.replace("TOKEN", token).replace("ID", walletId.toString()));
  }

  public insertWallet(token: string, walletForm: WalletForm): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.post<CryptoWalletResponse<Wallet>>(this.insertWalletPath.replace("TOKEN", token), walletForm);
  }

  public updateWallet(token: string, walletForm: WalletForm): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.put<CryptoWalletResponse<Wallet>>(this.updateWalletPath.replace("TOKEN", token).replace("ID", walletForm.id.toString()), walletForm);
  }

  public deleteWallet(token: string, wallet: Wallet): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.delete<CryptoWalletResponse<Wallet>>(this.deleteWalletPath.replace("TOKEN", token).replace("ID", wallet.id.toString()));
  }
}