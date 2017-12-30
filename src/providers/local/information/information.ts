import { Injectable } from '@angular/core';

import { User } from '../../../entities/user';
import { Token } from '../../../entities/token';

@Injectable()
export class LocalInformationProvider {

  public static readonly userKey: string = "user";
  public static readonly userIdKey: string = "user.id";
  public static readonly userLastnameKey: string = "user.lastname";
  public static readonly userFirstnameKey: string = "user.firstname";
  public static readonly userEmailKey: string = "user.email";
  public static readonly userPasswordKey: string = "user.password";
  public static readonly userEnabledKey: string = "user.enabled";
  public static readonly userAdministratorKey: string = "user.administrator";
  public static readonly userCreationDateKey: string = "user.creationDate";
  public static readonly userLastUpdateKey: string = "user.lastUpdate";
  public static readonly userLastActivityKey: string = "user.lastActivity";

  public static readonly userTokenIdKey: string = "user.token.id";
  public static readonly userTokenValueKey: string = "user.token.value";
  public static readonly userTokenBeginDateKey: string = "user.token.beginDate";
  public static readonly userTokenEndDateKey: string = "user.token.endDate";
  public static readonly userTokenCreationDateKey: string = "user.token.creationDate";
  public static readonly userTokenLastUpdateKey: string = "user.token.lastUpdate";

  constructor() {
  }

  public saveUserInformation(user: User): void {
    window.localStorage.setItem(LocalInformationProvider.userKey, "true");
    window.localStorage.setItem(LocalInformationProvider.userIdKey, JSON.stringify(user.id));
    window.localStorage.setItem(LocalInformationProvider.userLastnameKey, user.lastname);
    window.localStorage.setItem(LocalInformationProvider.userFirstnameKey, user.firstname);
    window.localStorage.setItem(LocalInformationProvider.userEmailKey, user.email);
    window.localStorage.setItem(LocalInformationProvider.userPasswordKey, user.password);
    window.localStorage.setItem(LocalInformationProvider.userEnabledKey, JSON.stringify(user.enabled));
    window.localStorage.setItem(LocalInformationProvider.userAdministratorKey, JSON.stringify(user.administrator));
    window.localStorage.setItem(LocalInformationProvider.userCreationDateKey, JSON.stringify(user.creationDate));
    window.localStorage.setItem(LocalInformationProvider.userLastUpdateKey, JSON.stringify(user.lastUpdate));
    window.localStorage.setItem(LocalInformationProvider.userLastActivityKey, JSON.stringify(user.lastActivity));
  }

  public saveTokenInformation(token: Token): void {
    window.localStorage.setItem(LocalInformationProvider.userTokenIdKey, JSON.stringify(token.id));
    window.localStorage.setItem(LocalInformationProvider.userTokenValueKey, token.value);
    window.localStorage.setItem(LocalInformationProvider.userTokenBeginDateKey, JSON.stringify(token.beginDate));
    window.localStorage.setItem(LocalInformationProvider.userTokenEndDateKey, JSON.stringify(token.endDate));
    window.localStorage.setItem(LocalInformationProvider.userTokenCreationDateKey, JSON.stringify(token.creationDate));
    window.localStorage.setItem(LocalInformationProvider.userTokenLastUpdateKey, JSON.stringify(token.lastUpdate));
  }

  public clearAllInformation(): void {
    this.clearTokenInformation();
    this.clearUserInformation();
  }

  public clearUserInformation(): void {
    window.localStorage.removeItem(LocalInformationProvider.userKey);
    window.localStorage.removeItem(LocalInformationProvider.userIdKey);
    window.localStorage.removeItem(LocalInformationProvider.userLastnameKey);
    window.localStorage.removeItem(LocalInformationProvider.userFirstnameKey);
    window.localStorage.removeItem(LocalInformationProvider.userEmailKey);
    window.localStorage.removeItem(LocalInformationProvider.userPasswordKey);
    window.localStorage.removeItem(LocalInformationProvider.userEnabledKey);
    window.localStorage.removeItem(LocalInformationProvider.userAdministratorKey);
    window.localStorage.removeItem(LocalInformationProvider.userCreationDateKey);
    window.localStorage.removeItem(LocalInformationProvider.userLastUpdateKey);
    window.localStorage.removeItem(LocalInformationProvider.userLastActivityKey);
  }

  public clearTokenInformation(): void {
    window.localStorage.removeItem(LocalInformationProvider.userTokenIdKey);
    window.localStorage.removeItem(LocalInformationProvider.userTokenValueKey);
    window.localStorage.removeItem(LocalInformationProvider.userTokenBeginDateKey);
    window.localStorage.removeItem(LocalInformationProvider.userTokenEndDateKey);
    window.localStorage.removeItem(LocalInformationProvider.userTokenCreationDateKey);
    window.localStorage.removeItem(LocalInformationProvider.userTokenLastUpdateKey);
  }

  public isUserRegistered(): boolean {
    return this.getStringValue(LocalInformationProvider.userKey) === undefined;
  }

  public isUserAdministrator(): boolean {
    return this.getStringValue(LocalInformationProvider.userAdministratorKey) === "true";
  }

  public getUserId(): number {
    return this.getIntValue(LocalInformationProvider.userIdKey);
  }

  public getUserTokenValue(): string {
    return this.getStringValue(LocalInformationProvider.userTokenValueKey);
  }

  private getStringValue(key: string): string {
    return window.localStorage.getItem(key);
  }

  private getIntValue(key: string): number {
    return parseInt(window.localStorage.getItem(key));
  }
}