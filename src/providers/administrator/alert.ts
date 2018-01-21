import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Alert } from '../../entities/alert';
import { AlertForm } from '../../forms/alertform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorAlertProvider {

  private readonly allAlertsPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/alert";
  private readonly getAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/alert/ID";
  private readonly insertAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/alert";
  private readonly updateAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/alert/ID";
  private readonly deleteAlertPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/alert/ID";

  constructor(private http: HttpClient) {}

  public allAlerts(token: string): Observable<CryptoWalletResponse<Array<Alert>>> {
    return this.http.get<CryptoWalletResponse<Array<Alert>>>(this.allAlertsPath.replace("TOKEN", token));
  }

  public getAlert(token: string, alertId: number): Observable<CryptoWalletResponse<Alert>> {
    return this.http.get<CryptoWalletResponse<Alert>>(this.getAlertPath.replace("TOKEN", token).replace("ID", alertId.toString()));
  }

  public insertAlert(token: string, alertForm: AlertForm): Observable<CryptoWalletResponse<Alert>> {
    return this.http.post<CryptoWalletResponse<Alert>>(this.insertAlertPath.replace("TOKEN", token), alertForm);
  }

  public updateAlert(token: string, alertForm: AlertForm): Observable<CryptoWalletResponse<Alert>> {
    return this.http.put<CryptoWalletResponse<Alert>>(this.updateAlertPath.replace("TOKEN", token).replace("ID", alertForm.id.toString()), alertForm);
  }

  public deleteAlert(token: string, alert: Alert): Observable<CryptoWalletResponse<Alert>> {
    return this.http.delete<CryptoWalletResponse<Alert>>(this.deleteAlertPath.replace("TOKEN", token).replace("ID", alert.id.toString()));
  }
}