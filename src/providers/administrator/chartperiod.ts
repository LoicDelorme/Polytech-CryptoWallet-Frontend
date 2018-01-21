import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChartPeriod } from '../../entities/chartperiod';
import { ChartPeriodForm } from '../../forms/chartperiodform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorChartPeriodProvider {

  private readonly allChartPeriodsPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/chart-period";
  private readonly getChartPeriodPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/chart-period/ID";
  private readonly insertChartPeriodPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/chart-period";
  private readonly updateChartPeriodPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/chart-period/ID";
  private readonly deleteChartPeriodPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/chart-period/ID";

  constructor(private http: HttpClient) {}

  public allChartPeriods(token: string): Observable<CryptoWalletResponse<Array<ChartPeriod>>> {
    return this.http.get<CryptoWalletResponse<Array<ChartPeriod>>>(this.allChartPeriodsPath.replace("TOKEN", token));
  }

  public getChartPeriod(token: string, chartPeriodId: number): Observable<CryptoWalletResponse<ChartPeriod>> {
    return this.http.get<CryptoWalletResponse<ChartPeriod>>(this.getChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriodId.toString()));
  }

  public insertChartPeriod(token: string, chartPeriodForm: ChartPeriodForm): Observable<CryptoWalletResponse<ChartPeriod>> {
    return this.http.post<CryptoWalletResponse<ChartPeriod>>(this.insertChartPeriodPath.replace("TOKEN", token), chartPeriodForm);
  }

  public updateChartPeriod(token: string, chartPeriodForm: ChartPeriodForm): Observable<CryptoWalletResponse<ChartPeriod>> {
    return this.http.put<CryptoWalletResponse<ChartPeriod>>(this.updateChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriodForm.id.toString()), chartPeriodForm);
  }

  public deleteChartPeriod(token: string, chartPeriod: ChartPeriod): Observable<CryptoWalletResponse<ChartPeriod>> {
    return this.http.delete<CryptoWalletResponse<ChartPeriod>>(this.deleteChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriod.id.toString()));
  }
}