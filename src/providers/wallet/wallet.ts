import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Wallet } from '../../model/wallet';
import { Response } from '../../model/response';

@Injectable()
export class WalletProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallets";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Wallet>>> {
    return this.http.get<Response<Array<Wallet>>>(WalletProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public get(token: string, userId: number, walletId: number): Observable<Response<Wallet>> {
    return this.http.get<Response<Wallet>>(WalletProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", walletId.toString()));
  }

  public insert(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.post<Response<Wallet>>(WalletProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), wallet);
  }

  public update(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.put<Response<Wallet>>(WalletProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()), wallet);
  }

  public delete(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.delete<Response<Wallet>>(WalletProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()));
  }
}