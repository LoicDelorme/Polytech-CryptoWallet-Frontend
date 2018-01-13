import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wallet } from '../../entities/wallet';
import { WalletForm } from '../../forms/walletform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorWalletProvider {

  private readonly allWalletsPath: string = "cryptowallet/administrator/TOKEN/wallet";
  private readonly getWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/ID";
  private readonly insertWalletPath: string = "cryptowallet/administrator/TOKEN/wallet";
  private readonly updateWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/ID";
  private readonly deleteWalletPath: string = "cryptowallet/administrator/TOKEN/wallet/ID";

  constructor(private http: HttpClient) {}

  public allWallets(token: string): Observable<Response<Array<Wallet>>> {
    return this.http.get<Response<Array<Wallet>>>(this.allWalletsPath.replace("TOKEN", token));
  }

  public getWallet(token: string, walletId: number): Observable<Response<Wallet>> {
    return this.http.get<Response<Wallet>>(this.getWalletPath.replace("TOKEN", token).replace("ID", walletId.toString()));
  }

  public insertWallet(token: string, walletForm: WalletForm): Observable<Response<Wallet>> {
    return this.http.post<Response<Wallet>>(this.insertWalletPath.replace("TOKEN", token), walletForm);
  }

  public updateWallet(token: string, walletForm: WalletForm): Observable<Response<Wallet>> {
    return this.http.put<Response<Wallet>>(this.updateWalletPath.replace("TOKEN", token).replace("ID", walletForm.id.toString()), walletForm);
  }

  public deleteWallet(token: string, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.delete<Response<Wallet>>(this.deleteWalletPath.replace("TOKEN", token).replace("ID", wallet.id.toString()));
  }
}