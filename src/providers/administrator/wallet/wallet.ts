import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wallet } from '../../../entities/wallet';
import { WalletForm } from '../../../forms/walletform';
import { Response } from '../../../responses/response';

@Injectable()
export class AdministratorWalletProvider {

  public static readonly allWalletsPath: string = "cryptowallet/administrator/TOKEN/wallet";
  public static readonly getWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/WALLET_ID";
  public static readonly insertWalletPath: string = "cryptowallet/administrator/TOKEN/wallet";
  public static readonly updateWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/WALLET_ID";
  public static readonly deleteWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/WALLET_ID";

  constructor(private http: HttpClient) {
  }

  public allWallets(token: string): Observable<Response<Array<Wallet>>> {
    return this.http.get<Response<Array<Wallet>>>(AdministratorWalletProvider.allWalletsPath.replace("TOKEN", token));
  }

  public getWallet(token: string, walletId: number): Observable<Response<Wallet>> {
    return this.http.get<Response<Wallet>>(AdministratorWalletProvider.getWalletPath.replace("TOKEN", token).replace("WALLET_ID", walletId.toString()));
  }

  public insertWallet(token: string, walletForm: WalletForm): Observable<Response<Wallet>> {
    return this.http.post<Response<Wallet>>(AdministratorWalletProvider.insertWalletPath.replace("TOKEN", token), walletForm);
  }

  public updateWallet(token: string, walletForm: WalletForm): Observable<Response<Wallet>> {
    return this.http.put<Response<Wallet>>(AdministratorWalletProvider.updateWalletPath.replace("TOKEN", token).replace("WALLET_ID", walletForm.id.toString()), walletForm);
  }

  public deleteWallet(token: string, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.delete<Response<Wallet>>(AdministratorWalletProvider.deleteWalletPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()));
  }
}