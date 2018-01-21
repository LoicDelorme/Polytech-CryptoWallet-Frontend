import { Theme } from "./theme";
import { Currency } from "./currency";
import { ChartPeriod } from "./chartperiod";

export class Setting {

  public id: number;
  public creationDate: string;
  public lastUpdate: string;
  public theme: Theme;
  public currency: Currency;
  public chartPeriod: ChartPeriod;

  constructor() {}
}