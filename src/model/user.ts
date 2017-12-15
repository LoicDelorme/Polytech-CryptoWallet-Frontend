import { Alert } from './alert';
import { Favorite } from './favorite';
import { Wallet } from './wallet';
import { Setting } from './setting';
import { Token } from './token';
import { Log } from './log';

export class Setting {
  constructor(private id:number, private lastname:string, private firstname:string, private email:string, private password:string, private isEnabled:boolean, private isAdministrator:boolean,
    private creationDate:Date, private lastUpdate:Date, private lastActivity:Date, private favorites:Array<Favorite>, private wallets:Array<Wallet>, private alerts:Array<Alert>,
    private settings:Array<Setting>, private tokens:Array<Token>, private logs:Array<Log>){
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.isEnabled = isEnabled;
    this.isAdministrator = isAdministrator;
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
