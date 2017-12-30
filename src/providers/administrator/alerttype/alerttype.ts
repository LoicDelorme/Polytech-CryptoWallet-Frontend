import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../../entities/alerttype';
import { AlertTypeForm } from '../../../forms/alerttypeform';
import { Response } from '../../../responses/response';

@Injectable()
export class AdministratorAlertTypeProvider {

  public static readonly allAlertTypesPath: string = "cryptowallet/administrator/TOKEN/alert-type";
  public static readonly getAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ALERT_TYPE_ID";
  public static readonly insertAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type";
  public static readonly updateAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ALERT_TYPE_ID";
  public static readonly deleteAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ALERT_TYPE_ID";

  constructor(private http: HttpClient) {
  }

  public allAlertTypes(token: string): Observable<Response<Array<AlertType>>> {
    return this.http.get<Response<Array<AlertType>>>(AdministratorAlertTypeProvider.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<Response<AlertType>> {
    return this.http.get<Response<AlertType>>(AdministratorAlertTypeProvider.getAlertTypePath.replace("TOKEN", token).replace("ALERT_TYPE_ID", alertTypeId.toString()));
  }

  public insertAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<Response<AlertType>> {
    return this.http.post<Response<AlertType>>(AdministratorAlertTypeProvider.insertAlertTypePath.replace("TOKEN", token), alertTypeForm);
  }

  public updateAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<Response<AlertType>> {
    return this.http.put<Response<AlertType>>(AdministratorAlertTypeProvider.updateAlertTypePath.replace("TOKEN", token).replace("ALERT_TYPE_ID", alertTypeForm.id.toString()), alertTypeForm);
  }

  public deleteAlertType(token: string, alertType: AlertType): Observable<Response<AlertType>> {
    return this.http.delete<Response<AlertType>>(AdministratorAlertTypeProvider.deleteAlertTypePath.replace("TOKEN", token).replace("ALERT_TYPE_ID", alertType.id.toString()));
  }
}