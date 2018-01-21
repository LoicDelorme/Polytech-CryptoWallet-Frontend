import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../entities/user';
import { Favorite } from '../../entities/favorite';
import { Wallet } from '../../entities/wallet';
import { Alert } from '../../entities/alert';
import { Setting } from '../../entities/setting';
import { Token } from '../../entities/token';
import { Log } from '../../entities/log';
import { Device } from '../../entities/device';
import { Asset } from '../../entities/asset';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { UserForm } from '../../forms/userform';
import { FavoriteForm } from '../../forms/favoriteform';
import { WalletForm } from '../../forms/walletform';
import { AlertForm } from '../../forms/alertform';
import { SettingForm } from '../../forms/settingform';
import { AssetForm } from '../../forms/assetform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class RegisteredUserProvider {

  private readonly getUserPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user";
  private readonly updateUserPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user";
  private readonly deleteUserPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user";

  private readonly allFavoritesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/favorites";
  private readonly allWalletsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallets";
  private readonly allAlertsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/alerts";
  private readonly allSettingsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/settings";
  private readonly allTokensPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/tokens";
  private readonly allLogsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/logs";
  private readonly allDevicesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/devices";
  private readonly allAssetsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallet/ID/assets";
  
  private readonly getWalletPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallet/ID";
  private readonly getAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/alert/ID";
  private readonly getTokenPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/token/ID";
  private readonly getLogPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/log/ID";
  private readonly getDevicePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/device/ID";
  private readonly getAssetPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  private readonly insertFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/favorite/ID";
  private readonly insertWalletPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallet";
  private readonly insertAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/alert";
  private readonly insertAssetPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  private readonly updateWalletPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallet/ID";
  private readonly updateAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/alert/ID";
  private readonly updateSettingsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/settings";
  private readonly updateAssetPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  private readonly deleteFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/favorite/ID";
  private readonly deleteWalletPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/wallet/ID";
  private readonly deleteAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/alert/ID";
  private readonly deleteTokenPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/token/ID";
  private readonly deleteDevicePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/device/ID";
  private readonly deleteAssetPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/registered/TOKEN/user/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {}

  public getUser(token: string): Observable<CryptoWalletResponse<User>> {
    return this.http.get<CryptoWalletResponse<User>>(this.getUserPath.replace("TOKEN", token));
  }

  public updateUser(token: string, userForm: UserForm): Observable<CryptoWalletResponse<User>> {
    return this.http.put<CryptoWalletResponse<User>>(this.updateUserPath.replace("TOKEN", token), userForm);
  }

  public deleteUser(token: string): Observable<CryptoWalletResponse<User>> {
    return this.http.delete<CryptoWalletResponse<User>>(this.deleteUserPath.replace("TOKEN", token));
  }

  public allFavorites(token: string): Observable<CryptoWalletResponse<Array<Cryptocurrency>>> {
    return this.http.get<CryptoWalletResponse<Array<Cryptocurrency>>>(this.allFavoritesPath.replace("TOKEN", token));
  }

  public allWallets(token: string): Observable<CryptoWalletResponse<Array<Wallet>>> {
    return this.http.get<CryptoWalletResponse<Array<Wallet>>>(this.allWalletsPath.replace("TOKEN", token));
  }

  public allAlerts(token: string): Observable<CryptoWalletResponse<Array<Alert>>> {
    return this.http.get<CryptoWalletResponse<Array<Alert>>>(this.allAlertsPath.replace("TOKEN", token));
  }

  public allSettings(token: string): Observable<CryptoWalletResponse<Setting>> {
    return this.http.get<CryptoWalletResponse<Setting>>(this.allSettingsPath.replace("TOKEN", token));
  }

  public allTokens(token: string): Observable<CryptoWalletResponse<Array<Token>>> {
    return this.http.get<CryptoWalletResponse<Array<Token>>>(this.allTokensPath.replace("TOKEN", token));
  }

  public allLogs(token: string): Observable<CryptoWalletResponse<Array<Log>>> {
    return this.http.get<CryptoWalletResponse<Array<Log>>>(this.allLogsPath.replace("TOKEN", token));
  }

  public allDevices(token: string): Observable<CryptoWalletResponse<Array<Device>>> {
    return this.http.get<CryptoWalletResponse<Array<Device>>>(this.allDevicesPath.replace("TOKEN", token));
  }

  public allAssets(token: string, wallet: Wallet): Observable<CryptoWalletResponse<Array<Asset>>> {
    return this.http.get<CryptoWalletResponse<Array<Asset>>>(this.allAssetsPath.replace("TOKEN", token).replace("ID", wallet.id.toString()));
  }

  public getWallet(token: string, walletId: number): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.get<CryptoWalletResponse<Wallet>>(this.getWalletPath.replace("TOKEN", token).replace("ID", walletId.toString()));
  }

  public getAlert(token: string, alertId: number): Observable<CryptoWalletResponse<Alert>> {
    return this.http.get<CryptoWalletResponse<Alert>>(this.getAlertPath.replace("TOKEN", token).replace("ID", alertId.toString()));
  }

  public getToken(token: string, tokenId: number): Observable<CryptoWalletResponse<Token>> {
    return this.http.get<CryptoWalletResponse<Token>>(this.getTokenPath.replace("TOKEN", token).replace("ID", tokenId.toString()));
  }

  public getLog(token: string, logId: number): Observable<CryptoWalletResponse<Log>> {
    return this.http.get<CryptoWalletResponse<Log>>(this.getLogPath.replace("TOKEN", token).replace("ID", logId.toString()));
  }

  public getDevice(token: string, deviceId: number): Observable<CryptoWalletResponse<Device>> {
    return this.http.get<CryptoWalletResponse<Device>>(this.getDevicePath.replace("TOKEN", token).replace("ID", deviceId.toString()));
  }

  public getAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Asset>> {
    return this.http.get<CryptoWalletResponse<Asset>>(this.getAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public insertFavorite(token: string, cryptocurrency: Cryptocurrency, favoriteForm: FavoriteForm): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.post<CryptoWalletResponse<Favorite>>(this.insertFavoritePath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()), favoriteForm);
  }

  public insertWallet(token: string, walletForm: WalletForm): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.post<CryptoWalletResponse<Wallet>>(this.insertWalletPath.replace("TOKEN", token), walletForm);
  }

  public insertAlert(token: string, alertForm: AlertForm): Observable<CryptoWalletResponse<Alert>> {
    return this.http.post<CryptoWalletResponse<Alert>>(this.insertAlertPath.replace("TOKEN", token), alertForm);
  }

  public insertAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, assetForm: AssetForm): Observable<CryptoWalletResponse<Asset>> {
    return this.http.post<CryptoWalletResponse<Asset>>(this.insertAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), assetForm);
  }

  public updateWallet(token: string, walletForm: WalletForm): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.put<CryptoWalletResponse<Wallet>>(this.updateWalletPath.replace("TOKEN", token).replace("ID", walletForm.id.toString()), walletForm);
  }

  public updateAlert(token: string, alertForm: AlertForm): Observable<CryptoWalletResponse<Alert>> {
    return this.http.put<CryptoWalletResponse<Alert>>(this.updateAlertPath.replace("TOKEN", token).replace("ID", alertForm.id.toString()), alertForm);
  }

  public updateSettings(token: string, settingForm: SettingForm): Observable<CryptoWalletResponse<Setting>> {
    return this.http.put<CryptoWalletResponse<Setting>>(this.updateSettingsPath.replace("TOKEN", token), settingForm);
  }

  public updateAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency, assetForm: AssetForm): Observable<CryptoWalletResponse<Asset>> {
    return this.http.put<CryptoWalletResponse<Asset>>(this.updateAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), assetForm);
  }

  public deleteFavorite(token: string, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.delete<CryptoWalletResponse<Favorite>>(this.deleteFavoritePath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }

  public deleteWallet(token: string, wallet: Wallet): Observable<CryptoWalletResponse<Wallet>> {
    return this.http.delete<CryptoWalletResponse<Wallet>>(this.deleteWalletPath.replace("TOKEN", token).replace("ID", wallet.id.toString()));
  }

  public deleteAlert(token: string, alert: Alert): Observable<CryptoWalletResponse<Alert>> {
    return this.http.delete<CryptoWalletResponse<Alert>>(this.deleteAlertPath.replace("TOKEN", token).replace("ID", alert.id.toString()));
  }  

  public deleteToken(token: string, token_: Token): Observable<CryptoWalletResponse<Token>> {
    return this.http.delete<CryptoWalletResponse<Token>>(this.deleteTokenPath.replace("TOKEN", token).replace("ID", token_.id.toString()));
  }

  public deleteDevice(token: string, device: Device): Observable<CryptoWalletResponse<Device>> {
    return this.http.delete<CryptoWalletResponse<Device>>(this.deleteDevicePath.replace("TOKEN", token).replace("ID", device.id.toString()));
  }

  public deleteAsset(token: string, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Asset>> {
    return this.http.delete<CryptoWalletResponse<Asset>>(this.deleteAssetPath.replace("TOKEN", token).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}