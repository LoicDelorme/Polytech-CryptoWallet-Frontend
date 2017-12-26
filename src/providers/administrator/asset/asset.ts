import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Asset } from '../../../model/asset';
import { Wallet } from '../../../model/wallet';
import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorAssetProvider {

  public static readonly allAssetsPath: string = "cryptowallet/administrator/TOKEN/asset";
  public static readonly getAssetPath: string = "cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly getAssetsByWalletPath: string = "cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID";
  public static readonly getAssetsByCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/asset/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly insertAssetPath: string = "cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly updateAssetPath: string = "cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deleteAssetPath: string = "cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public allAssets(token: string): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(AdministratorAssetProvider.allAssetsPath.replace("TOKEN", token));
  }

  public getAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.get<Response<Asset>>(AdministratorAssetProvider.getAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public getAssetsByWallet(token: string, wallet: Wallet): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(AdministratorAssetProvider.getAssetsByWalletPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()));
  }

  public getAssetsByCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(AdministratorAssetProvider.getAssetsByCryptocurrencyPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public insertAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.post<Response<Asset>>(AdministratorAssetProvider.insertAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public updateAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.put<Response<Asset>>(AdministratorAssetProvider.updateAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public deleteAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.delete<Response<Asset>>(AdministratorAssetProvider.deleteAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}