import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertType } from '../../entities/alerttype';
import { Response } from '../../responses/response';

@Injectable()
export class RegisteredAlertTypeProvider {

  private readonly allAlertTypesPath: string = "cryptowallet/registered/TOKEN/alert-type";
  private readonly getAlertTypePath: string = "cryptowallet/registered/TOKEN/alert-type/ID";

  constructor(private http: HttpClient) {}

  public allAlertTypes(token: string): Observable<Response<Array<AlertType>>> {
    return this.http.get<Response<Array<AlertType>>>(this.allAlertTypesPath.replace("TOKEN", token));
  }

  public getAlertType(token: string, alertTypeId: number): Observable<Response<AlertType>> {
    return this.http.get<Response<AlertType>>(this.getAlertTypePath.replace("TOKEN", token).replace("ID", alertTypeId.toString()));
  }
}