import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Asset } from '../../entities/asset';
import { AssetForm } from '../../forms/assetform';
import { Wallet } from '../../entities/wallet';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorAssetProvider {

  private readonly allAssetsPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset";
  private readonly getAssetPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly getAssetsByWalletPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/wallet/ID";
  private readonly getAssetsByCryptocurrencyPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/cryptocurrency/ID";
  private readonly insertAssetPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly updateAssetPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly deleteAssetPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {}

  public allAssets(token: string): Observable<CryptoWalletResponse<Array<Asset>>> {
    return this.http.get<CryptoWalletResponse<Array<Asset>>>(this.allAssetsPath.replace("TOKEN", token));
  }

  public getAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Asset>> {
    return this.http.get<CryptoWalletResponse<Asset>>(this.getAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public getAssetsByWallet(token: string, wallet: Wallet): Observable<CryptoWalletResponse<Array<Asset>>> {
    return this.http.get<CryptoWalletResponse<Array<Asset>>>(this.getAssetsByWalletPath.replace("TOKEN", token).replace("ID", wallet.id.toString()));
  }

  public getAssetsByCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Array<Asset>>> {
    return this.http.get<CryptoWalletResponse<Array<Asset>>>(this.getAssetsByCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }

  public insertAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, assetForm: Asset): Observable<CryptoWalletResponse<Asset>> {
    return this.http.post<CryptoWalletResponse<Asset>>(this.insertAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), assetForm);
  }

  public updateAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, assetForm: AssetForm): Observable<CryptoWalletResponse<Asset>> {
    return this.http.put<CryptoWalletResponse<Asset>>(this.updateAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), assetForm);
  }

  public deleteAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Asset>> {
    return this.http.delete<CryptoWalletResponse<Asset>>(this.deleteAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}