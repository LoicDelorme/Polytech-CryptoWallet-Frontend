import { Cryptocurrency } from './cryptocurrency';
import { Wallet } from './wallet';
import { Alert } from './alert';
import { Setting } from './setting';
import { Token } from './token';
import { Log } from './log';
import { Device } from './device';

export class User {

  public id: number;
  public lastname: string;
  public firstname: string;
  public email: string;
  public password: string;
  public enabled: boolean;
  public administrator: boolean;
  public creationDate: string;
  public lastUpdate: string;
  public lastActivity: string;
  public favorites: Array<Cryptocurrency>;
  public wallets: Array<Wallet>;
  public alerts: Array<Alert>;
  public setting: Setting;
  public tokens: Array<Token>;
  public logs: Array<Log>;
  public devices: Array<Device>;

  constructor() {}
}