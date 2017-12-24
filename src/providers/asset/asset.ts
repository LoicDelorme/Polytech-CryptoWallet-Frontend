import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Asset } from '../../model/asset';
import { Wallet } from '../../model/wallet';
import { Response } from '../../model/response';

@Injectable()
export class AssetProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID/assets";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number, walletId: number): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(AssetProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", walletId.toString()));
  }

  public insert(token: string, userId: number, wallet: Wallet, asset: Asset): Observable<Response<Asset>> {
    return this.http.post<Response<Asset>>(AssetProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()), asset);
  }

  public update(token: string, userId: number, wallet: Wallet, asset: Asset): Observable<Response<Asset>> {
    return this.http.put<Response<Asset>>(AssetProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()), asset);
  }

  public delete(token: string, userId: number, wallet: Wallet): Observable<Response<Asset>> {
    return this.http.delete<Response<Asset>>(AssetProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()));
  }
}