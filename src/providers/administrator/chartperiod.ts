import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ChartPeriod } from '../../entities/chartperiod';
import { ChartPeriodForm } from '../../forms/chartperiodform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorChartPeriodProvider {

  private readonly allChartPeriodsPath: string = "cryptowallet/administrator/TOKEN/alert-type";
  private readonly getChartPeriodPath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly insertChartPeriodPath: string = "cryptowallet/administrator/TOKEN/alert-type";
  private readonly updateChartPeriodPath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly deleteChartPeriodPath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";

  constructor(private http: HttpClient) {}

  public allChartPeriods(token: string): Observable<Response<Array<ChartPeriod>>> {
    return this.http.get<Response<Array<ChartPeriod>>>(this.allChartPeriodsPath.replace("TOKEN", token));
  }

  public getChartPeriod(token: string, chartPeriodId: number): Observable<Response<ChartPeriod>> {
    return this.http.get<Response<ChartPeriod>>(this.getChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriodId.toString()));
  }

  public insertChartPeriod(token: string, chartPeriodForm: ChartPeriodForm): Observable<Response<ChartPeriod>> {
    return this.http.post<Response<ChartPeriod>>(this.insertChartPeriodPath.replace("TOKEN", token), chartPeriodForm);
  }

  public updateChartPeriod(token: string, chartPeriodForm: ChartPeriodForm): Observable<Response<ChartPeriod>> {
    return this.http.put<Response<ChartPeriod>>(this.updateChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriodForm.id.toString()), chartPeriodForm);
  }

  public deleteChartPeriod(token: string, chartPeriod: ChartPeriod): Observable<Response<ChartPeriod>> {
    return this.http.delete<Response<ChartPeriod>>(this.deleteChartPeriodPath.replace("TOKEN", token).replace("ID", chartPeriod.id.toString()));
  }
}