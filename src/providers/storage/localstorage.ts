import { Injectable } from '@angular/core';

import { User } from '../../entities/user';
import { Token } from '../../entities/token';
import { Setting } from '../../entities/setting';

@Injectable()
export class LocalStorageProvider {

  private readonly userObjectKey: string = "user";
  private readonly userIdKey: string = "user.id";
  private readonly userLastnameKey: string = "user.lastname";
  private readonly userFirstnameKey: string = "user.firstname";
  private readonly userEmailKey: string = "user.email";
  private readonly userPasswordKey: string = "user.password";
  private readonly userEnabledKey: string = "user.enabled";
  private readonly userAdministratorKey: string = "user.administrator";
  private readonly userCreationDateKey: string = "user.creationDate";
  private readonly userLastUpdateKey: string = "user.lastUpdate";
  private readonly userLastActivityKey: string = "user.lastActivity";

  private readonly tokenObjectKey: string = "token";
  private readonly tokenIdKey: string = "token.id";
  private readonly tokenValueKey: string = "token.value";
  private readonly tokenBeginDateKey: string = "token.beginDate";
  private readonly tokenEndDateKey: string = "token.endDate";
  private readonly tokenCreationDateKey: string = "token.creationDate";
  private readonly tokenLastUpdateKey: string = "token.lastUpdate";

  private readonly settingObjectKey: string = "setting";
  private readonly settingIdKey: string = "setting.id";
  private readonly settingCreationDateKey: string = "setting.creationDate";
  private readonly settingLastUpdateKey: string = "setting.lastUpdate";
  private readonly settingThemeIdKey: string = "setting.theme.id";
  private readonly settingThemeNameKey: string = "setting.theme.name";
  private readonly settingCurrencyIdKey: string = "setting.currency.id";
  private readonly settingCurrencyNameKey: string = "setting.currency.name";
  private readonly settingChartPeriodIdKey: string = "setting.chartPeriod.id";
  private readonly settingChartPeriodNameKey: string = "setting.chartPeriod.name";

  constructor() {}

  private setStringValue(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  private setNumberValue(key: string, value: number): void {
    this.setStringValue(key, "" + value);
  }

  private setObjectValue(key: string, value: any): void {
    this.setStringValue(key, JSON.stringify(value));
  }

  private getStringValue(key: string): string {
    return window.localStorage.getItem(key);
  }

  private getIntValue(key: string): number {
    return parseInt(this.getStringValue(key));
  }

  private getObjectValue(key: string): any {
    return JSON.parse(this.getStringValue(key));
  }

  private removeValue(key: string): void {
    window.localStorage.removeItem(key);
  }

  public getUser(): User {
    return this.getObjectValue(this.userObjectKey);
  }

  public getToken(): Token {
    return this.getObjectValue(this.tokenObjectKey);
  }

  public getSetting(): Setting {
    return this.getObjectValue(this.settingObjectKey);
  }

  public saveUserInformation(user: User): void {
    this.setObjectValue(this.userObjectKey, user);
    this.setNumberValue(this.userIdKey, user.id);
    this.setStringValue(this.userLastnameKey, user.lastname);
    this.setStringValue(this.userFirstnameKey, user.firstname);
    this.setStringValue(this.userEmailKey, user.email);
    this.setStringValue(this.userPasswordKey, user.password);
    this.setObjectValue(this.userEnabledKey, user.enabled);
    this.setObjectValue(this.userAdministratorKey, user.administrator);
    this.setStringValue(this.userCreationDateKey, user.creationDate);
    this.setStringValue(this.userLastUpdateKey, user.lastUpdate);
    this.setStringValue(this.userLastActivityKey, user.lastActivity);
  }

  public saveTokenInformation(token: Token): void {
    this.setObjectValue(this.tokenObjectKey, token);
    this.setNumberValue(this.tokenIdKey, token.id);
    this.setStringValue(this.tokenValueKey, token.value);
    this.setStringValue(this.tokenBeginDateKey, token.beginDate);
    this.setStringValue(this.tokenEndDateKey, token.endDate);
    this.setStringValue(this.tokenCreationDateKey, token.creationDate);
    this.setStringValue(this.tokenLastUpdateKey, token.lastUpdate);
  }

  public saveSettingInformation(setting: Setting): void {
    this.setObjectValue(this.settingObjectKey, setting);
    this.setNumberValue(this.settingIdKey, setting.id);
    this.setStringValue(this.settingCreationDateKey, setting.creationDate);
    this.setStringValue(this.settingLastUpdateKey, setting.lastUpdate);
    this.setNumberValue(this.settingThemeIdKey, setting.theme.id);
    this.setStringValue(this.settingThemeNameKey, setting.theme.name);
    this.setNumberValue(this.settingCurrencyIdKey, setting.currency.id);
    this.setStringValue(this.settingCurrencyNameKey, setting.currency.name);
    this.setNumberValue(this.settingChartPeriodIdKey, setting.chartPeriod.id);
    this.setStringValue(this.settingChartPeriodNameKey, setting.chartPeriod.name);
  }

  public clearAllInformation(): void {
    this.clearTokenInformation();
    this.clearUserInformation();
    this.clearSettingInformation();
  }

  public clearUserInformation(): void {
    this.removeValue(this.userObjectKey);
    this.removeValue(this.userIdKey);
    this.removeValue(this.userLastnameKey);
    this.removeValue(this.userFirstnameKey);
    this.removeValue(this.userEmailKey);
    this.removeValue(this.userPasswordKey);
    this.removeValue(this.userEnabledKey);
    this.removeValue(this.userAdministratorKey);
    this.removeValue(this.userCreationDateKey);
    this.removeValue(this.userLastUpdateKey);
    this.removeValue(this.userLastActivityKey);
  }

  public clearTokenInformation(): void {
    this.removeValue(this.tokenObjectKey);
    this.removeValue(this.tokenIdKey);
    this.removeValue(this.tokenValueKey);
    this.removeValue(this.tokenBeginDateKey);
    this.removeValue(this.tokenEndDateKey);
    this.removeValue(this.tokenCreationDateKey);
    this.removeValue(this.tokenLastUpdateKey);
  }

  public clearSettingInformation(): void {
    this.removeValue(this.settingObjectKey);
    this.removeValue(this.settingIdKey);
    this.removeValue(this.settingCreationDateKey);
    this.removeValue(this.settingLastUpdateKey);
    this.removeValue(this.settingThemeIdKey);
    this.removeValue(this.settingThemeNameKey);
    this.removeValue(this.settingCurrencyIdKey);
    this.removeValue(this.settingCurrencyNameKey);
    this.removeValue(this.settingChartPeriodIdKey);
    this.removeValue(this.settingChartPeriodNameKey);
  }

  public isUserRegistered(): boolean {
    return this.getObjectValue(this.userObjectKey) != undefined;
  }

  public isUserAdministrator(): boolean {
    return this.getStringValue(this.userAdministratorKey) === "true";
  }

  public getUserId(): number {
    return this.getIntValue(this.userIdKey);
  }

  public getUserTokenValue(): string {
    return this.getStringValue(this.tokenValueKey);
  }

  public getUserTokenEndDate(): string {
    return this.getStringValue(this.tokenEndDateKey);
  }
}