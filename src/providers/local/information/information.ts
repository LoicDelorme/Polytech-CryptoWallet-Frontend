import { Injectable } from '@angular/core';

import { User } from '../../../entities/user';
import { Token } from '../../../entities/token';

@Injectable()
export class LocalInformationProvider {

  public static readonly userKey: string = "user";
  public static readonly userUserKey: string = "user.user";
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

  public static readonly userTokenKey: string = "user.token";
  public static readonly userTokenIdKey: string = "user.token.id";
  public static readonly userTokenValueKey: string = "user.token.value";
  public static readonly userTokenBeginDateKey: string = "user.token.beginDate";
  public static readonly userTokenEndDateKey: string = "user.token.endDate";
  public static readonly userTokenCreationDateKey: string = "user.token.creationDate";
  public static readonly userTokenLastUpdateKey: string = "user.token.lastUpdate";

  constructor() {
  }

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
    return this.getObjectValue(LocalInformationProvider.userKey);
  }

  public getToken(): Token {
    return this.getObjectValue(LocalInformationProvider.userTokenKey);
  }

  public saveUserInformation(user: User): void {
    this.setObjectValue(LocalInformationProvider.userKey, user);
    this.setStringValue(LocalInformationProvider.userUserKey, "true");
    this.setNumberValue(LocalInformationProvider.userIdKey, user.id);
    this.setStringValue(LocalInformationProvider.userLastnameKey, user.lastname);
    this.setStringValue(LocalInformationProvider.userFirstnameKey, user.firstname);
    this.setStringValue(LocalInformationProvider.userEmailKey, user.email);
    this.setStringValue(LocalInformationProvider.userPasswordKey, user.password);
    this.setObjectValue(LocalInformationProvider.userEnabledKey, user.enabled);
    this.setObjectValue(LocalInformationProvider.userAdministratorKey, user.administrator);
    this.setStringValue(LocalInformationProvider.userCreationDateKey, user.creationDate);
    this.setStringValue(LocalInformationProvider.userLastUpdateKey, user.lastUpdate);
    this.setStringValue(LocalInformationProvider.userLastActivityKey, user.lastActivity);
  }

  public saveTokenInformation(token: Token): void {
    this.setObjectValue(LocalInformationProvider.userTokenKey, token);
    this.setNumberValue(LocalInformationProvider.userTokenIdKey, token.id);
    this.setStringValue(LocalInformationProvider.userTokenValueKey, token.value);
    this.setStringValue(LocalInformationProvider.userTokenBeginDateKey, token.beginDate);
    this.setStringValue(LocalInformationProvider.userTokenEndDateKey, token.endDate);
    this.setStringValue(LocalInformationProvider.userTokenCreationDateKey, token.creationDate);
    this.setStringValue(LocalInformationProvider.userTokenLastUpdateKey, token.lastUpdate);
  }

  public clearAllInformation(): void {
    this.clearTokenInformation();
    this.clearUserInformation();
  }

  public clearUserInformation(): void {
    this.removeValue(LocalInformationProvider.userKey);
    this.removeValue(LocalInformationProvider.userUserKey);
    this.removeValue(LocalInformationProvider.userIdKey);
    this.removeValue(LocalInformationProvider.userLastnameKey);
    this.removeValue(LocalInformationProvider.userFirstnameKey);
    this.removeValue(LocalInformationProvider.userEmailKey);
    this.removeValue(LocalInformationProvider.userPasswordKey);
    this.removeValue(LocalInformationProvider.userEnabledKey);
    this.removeValue(LocalInformationProvider.userAdministratorKey);
    this.removeValue(LocalInformationProvider.userCreationDateKey);
    this.removeValue(LocalInformationProvider.userLastUpdateKey);
    this.removeValue(LocalInformationProvider.userLastActivityKey);
  }

  public clearTokenInformation(): void {
    this.removeValue(LocalInformationProvider.userTokenKey);
    this.removeValue(LocalInformationProvider.userTokenIdKey);
    this.removeValue(LocalInformationProvider.userTokenValueKey);
    this.removeValue(LocalInformationProvider.userTokenBeginDateKey);
    this.removeValue(LocalInformationProvider.userTokenEndDateKey);
    this.removeValue(LocalInformationProvider.userTokenCreationDateKey);
    this.removeValue(LocalInformationProvider.userTokenLastUpdateKey);
  }

  public isUserRegistered(): boolean {
    return this.getStringValue(LocalInformationProvider.userUserKey) === "true";
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

  public getUserTokenEndDate(): string {
    return this.getStringValue(LocalInformationProvider.userTokenEndDateKey);
  }
}