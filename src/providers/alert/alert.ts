import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Alert } from '../../model/alert';
import { Response } from '../../model/response';

@Injectable()
export class AlertProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alerts";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert/ALERT_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Alert>>> {
    return this.http.get<Response<Array<Alert>>>(AlertProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public get(token: string, userId: number, alertId: number): Observable<Response<Alert>> {
    return this.http.get<Response<Alert>>(AlertProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alertId.toString()));
  }

  public insert(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.post<Response<Alert>>(AlertProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), alert);
  }

  public update(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.put<Response<Alert>>(AlertProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alert.id.toString()), alert);
  }

  public delete(token: string, userId: number, alert: Alert): Observable<Response<Alert>> {
    return this.http.delete<Response<Alert>>(AlertProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("ALERT_ID", alert.id.toString()));
  }
}