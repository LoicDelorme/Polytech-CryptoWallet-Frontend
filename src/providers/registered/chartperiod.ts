import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChartPeriod } from '../../entities/chartperiod';
import { Response } from '../../responses/response';

@Injectable()
export class RegisteredChartPeriodProvider {

  private readonly allChartPeriodsPath: string = "cryptowallet/registered/TOKEN/chart-period";
  private readonly getChartPeriodPath: string = "cryptowallet/registered/TOKEN/chart-period/ID";

  constructor(private http: HttpClient) {}

  public allChartPeriods(token: string): Observable<Response<Array<ChartPeriod>>> {
    return this.http.get<Response<Array<ChartPeriod>>>(this.allChartPeriodsPath.replace("TOKEN", token));
  }

  public getChartPeriod(token: string, chartPeriodId: number): Observable<Response<ChartPeriod>> {
    return this.http.get<Response<ChartPeriod>>(this.getChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriodId.toString()));
  }
}