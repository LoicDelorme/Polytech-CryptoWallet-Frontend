import { Injectable } from '@angular/core';

import { User } from '../../entities/user';
import { Token } from '../../entities/token';

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

  public clearAllInformation(): void {
    this.clearTokenInformation();
    this.clearUserInformation();
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