import { Cryptocurrency } from "./cryptocurrency";
import { AlertType } from "./alerttype";

export class Alert {

  public id: number;
  public name: string;
  public threshold: number;
  public oneShot: boolean;
  public active: boolean;
  public creationDate: string;
  public lastUpdate: string;
  public userId: number;
  public cryptocurrency: Cryptocurrency;
  public type: AlertType;

  constructor() {}
}