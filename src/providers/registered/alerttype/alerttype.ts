import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../../model/alerttype';
import { Response } from '../../../model/response';

@Injectable()
export class RegisteredAlertTypeProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert-type";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/alert-type/ALERT_TYPE_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string): Observable<Response<Array<AlertType>>> {
    return this.http.get<Response<Array<AlertType>>>(RegisteredAlertTypeProvider.allPath.replace("TOKEN", token));
  }

  public get(token: string, alertTypeId: number): Observable<Response<AlertType>> {
    return this.http.get<Response<AlertType>>(RegisteredAlertTypeProvider.getPath.replace("TOKEN", token).replace("ALERT_TYPE_ID", alertTypeId.toString()));
  }
}