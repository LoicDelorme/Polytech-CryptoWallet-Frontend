import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../entities/alerttype';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class RegisteredAlertTypeProvider {

  private readonly allAlertTypesPath: string = "http://51.15.205.40/api/cryptowallet/registered/TOKEN/alert-type";
  private readonly getAlertTypePath: string = "http://51.15.205.40/api/cryptowallet/registered/TOKEN/alert-type/ID";

  constructor(private http: HttpClient) {}

  public allAlertTypes(token: string): Observable<CryptoWalletResponse<Array<AlertType>>> {
    return this.http.get<CryptoWalletResponse<Array<AlertType>>>(this.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<CryptoWalletResponse<AlertType>> {
    return this.http.get<CryptoWalletResponse<AlertType>>(this.getAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeId.toString()));
  }
}