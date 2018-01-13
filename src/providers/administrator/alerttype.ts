import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../entities/alerttype';
import { AlertTypeForm } from '../../forms/alerttypeform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorAlertTypeProvider {

  private readonly allAlertTypesPath: string = "cryptowallet/administrator/TOKEN/alert-type";
  private readonly getAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly insertAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type";
  private readonly updateAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly deleteAlertTypePath: string = "cryptowallet/administrator/TOKEN/alert-type/ID";

  constructor(private http: HttpClient) {}

  public allAlertTypes(token: string): Observable<Response<Array<AlertType>>> {
    return this.http.get<Response<Array<AlertType>>>(this.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<Response<AlertType>> {
    return this.http.get<Response<AlertType>>(this.getAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeId.toString()));
  }

  public insertAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<Response<AlertType>> {
    return this.http.post<Response<AlertType>>(this.insertAlertTypePath.replace("TOKEN", token), alertTypeForm);
  }

  public updateAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<Response<AlertType>> {
    return this.http.put<Response<AlertType>>(this.updateAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeForm.id.toString()), alertTypeForm);
  }

  public deleteAlertType(token: string, alertType: AlertType): Observable<Response<AlertType>> {
    return this.http.delete<Response<AlertType>>(this.deleteAlertTypePath.replace("TOKEN", token).replace("ID", alertType.id.toString()));
  }
}