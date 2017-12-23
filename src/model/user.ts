import { Cryptocurrency } from './cryptocurrency';
import { Wallet } from './wallet';
import { Alert } from './alert';
import { Setting } from './setting';
import { Token } from './token';
import { Log } from './log';

export class User {

  public id: number;
  public lastname: string;
  public firstname: string;
  public email: string;
  public password: string;
  public enabled: boolean;
  public administrator: boolean;
  public creationDate: Date;
  public lastUpdate: Date;
  public lastActivity: Date;
  public favorites: Array<Cryptocurrency>;
  public wallets: Array<Wallet>;
  public alerts: Array<Alert>;
  public settings: Array<Setting>;
  public tokens: Array<Token>;
  public logs: Array<Log>;

  constructor(id: number, lastname: string, firstname: string, email: string, password: string, enabled: boolean, administrator: boolean, creationDate: Date, lastUpdate: Date, lastActivity: Date, favorites: Array<Cryptocurrency>, wallets: Array<Wallet>, alerts: Array<Alert>, settings: Array<Setting>, tokens: Array<Token>, logs: Array<Log>) {
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