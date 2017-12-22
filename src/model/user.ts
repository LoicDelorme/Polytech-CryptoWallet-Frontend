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
}