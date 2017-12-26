import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../../model/alerttype';
import { Response } from '../../../model/response';

@Injectable()
export class RegisteredAlertTypeProvider {

  public static readonly allAlertTypesPath: string = "cryptowallet/registered/TOKEN/alert-type";
  public static readonly getAlertTypePath: string = "cryptowallet/registered/TOKEN/alert-type/ALERT_TYPE_ID";

  constructor(private http: HttpClient) {
  }

  public allAlertTypes(token: string): Observable<Response<Array<AlertType>>> {
    return this.http.get<Response<Array<AlertType>>>(RegisteredAlertTypeProvider.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<Response<AlertType>> {
    return this.http.get<Response<AlertType>>(RegisteredAlertTypeProvider.getAlertTypePath.replace("TOKEN", token).replace("ALERT_TYPE_ID", alertTypeId.toString()));
  }
}