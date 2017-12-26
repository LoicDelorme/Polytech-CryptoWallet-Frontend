import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user';
import { Token } from '../../../model/token';
import { Favorite } from '../../../model/favorite';
import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Wallet } from '../../../model/wallet';
import { Alert } from '../../../model/alert';
import { Setting } from '../../../model/setting';
import { Log } from '../../../model/log';
import { Asset } from '../../../model/asset';
import { Response } from '../../../model/response';

@Injectable()
export class RegisteredUserProvider {

  public static readonly getUserPath: string = "cryptowallet/registered/TOKEN/user/USER_ID";
  public static readonly updateUserPath: string = "cryptowallet/registered/TOKEN/user/USER_ID";
  public static readonly deleteUserPath: string = "cryptowallet/registered/TOKEN/user/USER_ID";

  public static readonly allFavoritesPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorites";
  public static readonly insertFavoritePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorite/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deleteFavoritePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorite/cryptocurrency/CRYPTOCURRENCY_ID";

  public static readonly allWalletsPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallets";
  public static readonly getWalletPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";
  public static readonly insertWalletPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet";
  public static readonly updateWalletPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";
  public static readonly deleteWalletPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID";

  public static readonly allAlertsPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alerts";
  public static readonly getAlertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";
  public static readonly insertAlertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert";
  public static readonly updateAlertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";
  public static readonly deleteAlertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";

  public static readonly allSettingsPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/settings";
  public static readonly getSettingPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";
  public static readonly insertSettingPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting";
  public static readonly updateSettingPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";
  public static readonly deleteSettingPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";

  public static readonly allTokensPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/tokens";
  public static readonly getTokenPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token/TOKEN_ID";
  public static readonly deleteTokenPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token/TOKEN_ID";

  public static readonly allLogsPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/logs";
  public static readonly getLogPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/log/LOG_ID";

  public static readonly allAssetsPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/wallet/WALLET_ID/assets";
  public static readonly getAssetPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly insertAssetPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly updateAssetPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deleteAssetPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/asset/wallet/WALLET_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public getUser(token: string, userId: number): Observable<Response<User>> {
    return this.http.get<Response<User>>(RegisteredUserProvider.getUserPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public updateUser(token: string, user: User): Observable<Response<User>> {
    return this.http.put<Response<User>>(RegisteredUserProvider.updateUserPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), user);
  }

  public deleteUser(token: string, user: User): Observable<Response<User>> {
    return this.http.delete<Response<User>>(RegisteredUserProvider.deleteUserPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public allFavorites(token: string, userId: number): Observable<Response<Array<Cryptocurrency>>> {
    return this.http.get<Response<Array<Cryptocurrency>>>(RegisteredUserProvider.allFavoritesPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public insertFavorite(token: string, userId: number, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.post<Response<Favorite>>(RegisteredUserProvider.insertFavoritePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), null);
  }

  public deleteFavorite(token: string, userId: number, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.delete<Response<Favorite>>(RegisteredUserProvider.deleteFavoritePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public allWallets(token: string, userId: number): Observable<Response<Array<Wallet>>> {
    return this.http.get<Response<Array<Wallet>>>(RegisteredUserProvider.allWalletsPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public getWallet(token: string, userId: number, walletId: number): Observable<Response<Wallet>> {
    return this.http.get<Response<Wallet>>(RegisteredUserProvider.getWalletPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", walletId.toString()));
  }

  public insertWallet(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.post<Response<Wallet>>(RegisteredUserProvider.insertWalletPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), wallet);
  }

  public updateWallet(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.put<Response<Wallet>>(RegisteredUserProvider.updateWalletPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()), wallet);
  }

  public deleteWallet(token: string, userId: number, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.delete<Response<Wallet>>(RegisteredUserProvider.deleteWalletPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()));
  }

  public allAlerts(token: string, userId: number): Observable<Response<Array<Alert>>> {
    return this.http.get<Response<Array<Alert>>>(RegisteredUserProvider.allAlertsPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public getAlert(token: string, userId: number, alertId: number): Observable<Response<Alert>> {
    return this.http.get<Response<Alert>>(RegisteredUserProvider.getAlertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alertId.toString()));
  }

  public insertAlert(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.post<Response<Alert>>(RegisteredUserProvider.insertAlertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), alert);
  }

  public updateAlert(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.put<Response<Alert>>(RegisteredUserProvider.updateAlertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alert.id.toString()), alert);
  }

  public deleteAlert(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.delete<Response<Alert>>(RegisteredUserProvider.deleteAlertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alert.id.toString()));
  }

  public allSettings(token: string, userId: number): Observable<Response<Array<Setting>>> {
    return this.http.get<Response<Array<Setting>>>(RegisteredUserProvider.allSettingsPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public getSetting(token: string, userId: number, settingId: number): Observable<Response<Setting>> {
    return this.http.get<Response<Setting>>(RegisteredUserProvider.getSettingPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", settingId.toString()));
  }

  public insertSetting(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.post<Response<Setting>>(RegisteredUserProvider.insertSettingPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), setting);
  }

  public updateSetting(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.put<Response<Setting>>(RegisteredUserProvider.updateSettingPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", setting.id.toString()), setting);
  }

  public deleteSetting(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.delete<Response<Setting>>(RegisteredUserProvider.deleteSettingPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", setting.id.toString()));
  }

  public allTokens(token: string, userId: number): Observable<Response<Array<Token>>> {
    return this.http.get<Response<Array<Token>>>(RegisteredUserProvider.allTokensPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public getToken(token: string, userId: number, tokenId: number): Observable<Response<Token>> {
    return this.http.get<Response<Token>>(RegisteredUserProvider.getTokenPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("TOKEN_ID", tokenId.toString()));
  }

  public deleteToken(token: string, userId: number, token_: Token): Observable<Response<Token>> {
    return this.http.delete<Response<Token>>(RegisteredUserProvider.deleteTokenPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("TOKEN_ID", token_.id.toString()));
  }

  public allLogs(token: string, userId: number): Observable<Response<Array<Log>>> {
    return this.http.get<Response<Array<Log>>>(RegisteredUserProvider.allLogsPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public getLog(token: string, userId: number, logId: number): Observable<Response<Log>> {
    return this.http.get<Response<Log>>(RegisteredUserProvider.getLogPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("LOG_ID", logId.toString()));
  }

  public allAssets(token: string, userId: number, wallet: Wallet): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(RegisteredUserProvider.allAssetsPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()));
  }

  public getAsset(token: string, userId: number, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.get<Response<Asset>>(RegisteredUserProvider.getAssetPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public insertAsset(token: string, userId: number, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.post<Response<Asset>>(RegisteredUserProvider.insertAssetPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public updateAsset(token: string, userId: number, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.put<Response<Asset>>(RegisteredUserProvider.updateAssetPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public deleteAsset(token: string, userId: number, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.delete<Response<Asset>>(RegisteredUserProvider.deleteAssetPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("WALLET_ID", wallet.id.toString()));
  }
}