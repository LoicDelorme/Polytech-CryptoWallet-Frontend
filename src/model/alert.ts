import { Cryptocurrency } from "./cryptocurrency";
import { AlertType } from "./alerttype";

export class Alert {

  public id: number;
  public name: string;
  public threshold: number;
  public oneShot: boolean;
  public active: boolean;
  public creationDate: Date;
  public lastUpdate: Date;
  public userId: number;
  public cryptocurrency: Cryptocurrency;
  public type: AlertType;

  constructor(id: number, name: string, threshold: number, oneShot: boolean, active: boolean, creationDate: Date, lastUpdate: Date, userId: number, cryptocurrency: Cryptocurrency, type: AlertType) {
    this.id = id;
    this.name = name;
    this.threshold = threshold;
    this.oneShot = oneShot;
    this.active = active;
    this.creationDate = creationDate;
    this.lastUpdate = lastUpdate;
    this.userId = userId;
    this.cryptocurrency = cryptocurrency;
    this.type = type;
  }
}