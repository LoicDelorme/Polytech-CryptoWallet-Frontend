import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Alert } from '../../../model/alert';
import { AlertForm } from '../../../forms/alertform';
import { Response } from '../../../responses/response';

@Injectable()
export class AdministratorAlertProvider {

  public static readonly allAlertsPath: string = "cryptowallet/administrator/TOKEN/alert";
  public static readonly getAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ALERT_ID";
  public static readonly insertAlertPath: string = "cryptowallet/administrator/TOKEN/alert";
  public static readonly updateAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ALERT_ID";
  public static readonly deleteAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ALERT_ID";

  constructor(private http: HttpClient) {
  }

  public allAlerts(token: string): Observable<Response<Array<Alert>>> {
    return this.http.get<Response<Array<Alert>>>(AdministratorAlertProvider.allAlertsPath.replace("TOKEN", token));
  }

  public getAlert(token: string, alertId: number): Observable<Response<Alert>> {
    return this.http.get<Response<Alert>>(AdministratorAlertProvider.getAlertPath.replace("TOKEN", token).replace("ALERT_ID", alertId.toString()));
  }

  public insertAlert(token: string, alertForm: AlertForm): Observable<Response<Alert>> {
    return this.http.post<Response<Alert>>(AdministratorAlertProvider.insertAlertPath.replace("TOKEN", token), alertForm);
  }

  public updateAlert(token: string, alertForm: AlertForm): Observable<Response<Alert>> {
    return this.http.put<Response<Alert>>(AdministratorAlertProvider.updateAlertPath.replace("TOKEN", token).replace("ALERT_ID", alertForm.id.toString()), alertForm);
  }

  public deleteAlert(token: string, alert: Alert): Observable<Response<Alert>> {
    return this.http.delete<Response<Alert>>(AdministratorAlertProvider.deleteAlertPath.replace("TOKEN", token).replace("ALERT_ID", alert.id.toString()));
  }
}