import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChartPeriod } from '../../entities/chartperiod';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class UnregisteredChartPeriodProvider {

  private readonly allChartPeriodsPath: string = "cryptowallet/unregistered/chart-period";
  private readonly getChartPeriodPath: string = "cryptowallet/unregistered/chart-period/ID";

  constructor(private http: HttpClient) {}

  public allChartPeriods(): Observable<CryptoWalletResponse<Array<ChartPeriod>>> {
    return this.http.get<CryptoWalletResponse<Array<ChartPeriod>>>(this.allChartPeriodsPath);
  }

  public getChartPeriod(chartPeriodId: number): Observable<CryptoWalletResponse<ChartPeriod>> {
    return this.http.get<CryptoWalletResponse<ChartPeriod>>(this.getChartPeriodPath.replace("ID", chartPeriodId.toString()));
  }
}