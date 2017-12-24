import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Response } from '../../../model/response';
import { User } from '../../../model/user';
import { Token } from '../../../model/token';
import { Favorite } from '../../../model/favorite';
import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Wallet } from '../../../model/wallet';
import { Alert } from '../../../model/alert';
import { Setting } from '../../../model/setting';
import { Log } from '../../../model/log';
import { Asset } from '../../../model/asset';

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

  public allFavorites(token: string, user: User): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(RegisteredUserProvider.allFavoritesPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public insertFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.post<Response<Favorite>>(RegisteredUserProvider.insertFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), null);
  }

  public deleteFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.delete<Response<Favorite>>(RegisteredUserProvider.deleteFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public allWallets(token: string, user: User): Observable<Response<Array<Wallet>>> {
    return this.http.get<Response<Array<Wallet>>>(RegisteredUserProvider.allWalletsPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getWallet(token: string, user: User, walletId: number): Observable<Response<Wallet>> {
    return this.http.get<Response<Wallet>>(RegisteredUserProvider.getWalletPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", walletId.toString()));
  }

  public insertWallet(token: string, user: User, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.post<Response<Wallet>>(RegisteredUserProvider.insertWalletPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), wallet);
  }

  public updateWallet(token: string, user: User, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.put<Response<Wallet>>(RegisteredUserProvider.updateWalletPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()), wallet);
  }

  public deleteWallet(token: string, user: User, wallet: Wallet): Observable<Response<Wallet>> {
    return this.http.delete<Response<Wallet>>(RegisteredUserProvider.deleteWalletPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()));
  }

  public allAlerts(token: string, user: User): Observable<Response<Array<Alert>>> {
    return this.http.get<Response<Array<Alert>>>(RegisteredUserProvider.allAlertsPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getAlert(token: string, user: User, alertId: number): Observable<Response<Alert>> {
    return this.http.get<Response<Alert>>(RegisteredUserProvider.getAlertPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("ALERT_ID", alertId.toString()));
  }

  public insertAlert(token: string, user: User, alert: Alert): Observable<Response<Alert>> {
    return this.http.post<Response<Alert>>(RegisteredUserProvider.insertAlertPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), alert);
  }

  public updateAlert(token: string, user: User, alert: Alert): Observable<Response<Alert>> {
    return this.http.put<Response<Alert>>(RegisteredUserProvider.updateAlertPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("ALERT_ID", alert.id.toString()), alert);
  }

  public deleteAlert(token: string, user: User, alert: Alert): Observable<Response<Alert>> {
    return this.http.delete<Response<Alert>>(RegisteredUserProvider.deleteAlertPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("ALERT_ID", alert.id.toString()));
  }

  public allSettings(token: string, user: User): Observable<Response<Array<Setting>>> {
    return this.http.get<Response<Array<Setting>>>(RegisteredUserProvider.allSettingsPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getSetting(token: string, user: User, settingId: number): Observable<Response<Setting>> {
    return this.http.get<Response<Setting>>(RegisteredUserProvider.getSettingPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("SETTING_ID", settingId.toString()));
  }

  public insertSetting(token: string, user: User, setting: Setting): Observable<Response<Setting>> {
    return this.http.post<Response<Setting>>(RegisteredUserProvider.insertSettingPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), setting);
  }

  public updateSetting(token: string, user: User, setting: Setting): Observable<Response<Setting>> {
    return this.http.put<Response<Setting>>(RegisteredUserProvider.updateSettingPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("SETTING_ID", setting.id.toString()), setting);
  }

  public deleteSetting(token: string, user: User, setting: Setting): Observable<Response<Setting>> {
    return this.http.delete<Response<Setting>>(RegisteredUserProvider.deleteSettingPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("SETTING_ID", setting.id.toString()));
  }

  public allTokens(token: string, user: User): Observable<Response<Array<Token>>> {
    return this.http.get<Response<Array<Token>>>(RegisteredUserProvider.allTokensPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getToken(token: string, user: User, tokenId: number): Observable<Response<Token>> {
    return this.http.get<Response<Token>>(RegisteredUserProvider.getTokenPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("TOKEN_ID", tokenId.toString()));
  }

  public deleteToken(token: string, user: User, token_: Token): Observable<Response<Token>> {
    return this.http.delete<Response<Token>>(RegisteredUserProvider.deleteTokenPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("TOKEN_ID", token_.id.toString()));
  }

  public allLogs(token: string, user: User): Observable<Response<Array<Log>>> {
    return this.http.get<Response<Array<Log>>>(RegisteredUserProvider.allLogsPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getLog(token: string, user: User, logId: number): Observable<Response<Log>> {
    return this.http.get<Response<Log>>(RegisteredUserProvider.getLogPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("LOG_ID", logId.toString()));
  }

  public allAssets(token: string, user: User, wallet: Wallet): Observable<Response<Array<Asset>>> {
    return this.http.get<Response<Array<Asset>>>(RegisteredUserProvider.allAssetsPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()));
  }

  public getAsset(token: string, user: User, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.get<Response<Asset>>(RegisteredUserProvider.getAssetPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public insertAsset(token: string, user: User, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.post<Response<Asset>>(RegisteredUserProvider.insertAssetPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public updateAsset(token: string, user: User, wallet: Wallet, cryptocurrency: Cryptocurrency, asset: Asset): Observable<Response<Asset>> {
    return this.http.put<Response<Asset>>(RegisteredUserProvider.updateAssetPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), asset);
  }

  public deleteAsset(token: string, user: User, wallet: Wallet, cryptocurrency: Cryptocurrency): Observable<Response<Asset>> {
    return this.http.delete<Response<Asset>>(RegisteredUserProvider.deleteAssetPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("WALLET_ID", wallet.id.toString()));
  }
}