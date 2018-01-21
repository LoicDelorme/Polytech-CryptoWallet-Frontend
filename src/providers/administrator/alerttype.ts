import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../entities/alerttype';
import { AlertTypeForm } from '../../forms/alerttypeform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorAlertTypeProvider {

  private readonly allAlertTypesPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/alert-type";
  private readonly getAlertTypePath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly insertAlertTypePath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/alert-type";
  private readonly updateAlertTypePath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/alert-type/ID";
  private readonly deleteAlertTypePath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/alert-type/ID";

  constructor(private http: HttpClient) {}

  public allAlertTypes(token: string): Observable<CryptoWalletResponse<Array<AlertType>>> {
    return this.http.get<CryptoWalletResponse<Array<AlertType>>>(this.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<CryptoWalletResponse<AlertType>> {
    return this.http.get<CryptoWalletResponse<AlertType>>(this.getAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeId.toString()));
  }

  public insertAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<CryptoWalletResponse<AlertType>> {
    return this.http.post<CryptoWalletResponse<AlertType>>(this.insertAlertTypePath.replace("TOKEN", token), alertTypeForm);
  }

  public updateAlertType(token: string, alertTypeForm: AlertTypeForm): Observable<CryptoWalletResponse<AlertType>> {
    return this.http.put<CryptoWalletResponse<AlertType>>(this.updateAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeForm.id.toString()), alertTypeForm);
  }

  public deleteAlertType(token: string, alertType: AlertType): Observable<CryptoWalletResponse<AlertType>> {
    return this.http.delete<CryptoWalletResponse<AlertType>>(this.deleteAlertTypePath.replace("TOKEN", token).replace("ID", alertType.id.toString()));
  }
}