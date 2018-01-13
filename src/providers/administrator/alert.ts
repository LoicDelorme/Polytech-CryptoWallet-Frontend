import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Alert } from '../../entities/alert';
import { AlertForm } from '../../forms/alertform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorAlertProvider {

  private readonly allAlertsPath: string = "cryptowallet/administrator/TOKEN/alert";
  private readonly getAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ID";
  private readonly insertAlertPath: string = "cryptowallet/administrator/TOKEN/alert";
  private readonly updateAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ID";
  private readonly deleteAlertPath: string = "cryptowallet/administrator/TOKEN/alert/ID";

  constructor(private http: HttpClient) {}

  public allAlerts(token: string): Observable<Response<Array<Alert>>> {
    return this.http.get<Response<Array<Alert>>>(this.allAlertsPath.replace("TOKEN", token));
  }

  public getAlert(token: string, alertId: number): Observable<Response<Alert>> {
    return this.http.get<Response<Alert>>(this.getAlertPath.replace("TOKEN", token).replace("ID", alertId.toString()));
  }

  public insertAlert(token: string, alertForm: AlertForm): Observable<Response<Alert>> {
    return this.http.post<Response<Alert>>(this.insertAlertPath.replace("TOKEN", token), alertForm);
  }

  public updateAlert(token: string, alertForm: AlertForm): Observable<Response<Alert>> {
    return this.http.put<Response<Alert>>(this.updateAlertPath.replace("TOKEN", token).replace("ID", alertForm.id.toString()), alertForm);
  }

  public deleteAlert(token: string, alert: Alert): Observable<Response<Alert>> {
    return this.http.delete<Response<Alert>>(this.deleteAlertPath.replace("TOKEN", token).replace("ID", alert.id.toString()));
  }
}