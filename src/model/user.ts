import { Cryptocurrency } from './cryptocurrency';
import { Wallet } from './wallet';
import { Alert } from './alert';
import { Setting } from './setting';
import { Token } from './token';
import { Log } from './log';

export class User {
  
  constructor(private id: number, private lastname: string, private firstname: string, private email: string, private password: string, private enabled: boolean, private administrator: boolean, private creationDate: Date, private lastUpdate: Date, private lastActivity: Date, private favorites: Cryptocurrency[], private wallets: Wallet[], private alerts: Alert[], private settings: Setting[], private tokens: Token[], private logs: Log[]) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.enabled = enabled;
    this.administrator = administrator;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.lastActivity = lastActivity;
    this.favorites = favorites;
    this.wallets = wallets;
    this.alerts = alerts;
    this.settings = settings;
    this.tokens = tokens;
    this.logs = logs;
  }

  public getId(): number {
    return this.id;
  }

  public getLastame(): string {
    return this.lastname;
  }

  public getFirstname(): string {
    return this.firstname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isAdministrator(): boolean {
    return this.administrator;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getLastUpdate(): Date {
    return this.lastUpdate;
  }

  public getLastActivity(): Date {
    return this.lastActivity;
  }

  public getFavorites(): Cryptocurrency[] {
    return this.favorites;
  }

  public getWallets(): Wallet[] {
    return this.wallets;
  }

  public getAlerts(): Alert[] {
    return this.alerts;
  }

  public getSettings(): Setting[] {
    return this.settings;
  }

  public getTokens(): Token[] {
    return this.tokens;
  }

  public getLogs(): Log[] {
    return this.logs;
  }
}