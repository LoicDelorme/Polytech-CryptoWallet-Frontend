import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Log } from '../../entities/log';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorLogProvider {

  private readonly allLogsPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/log";
  private readonly getLogPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/log/ID";

  constructor(private http: HttpClient) {}

  public allLogs(token: string): Observable<CryptoWalletResponse<Array<Log>>> {
    return this.http.get<CryptoWalletResponse<Array<Log>>>(this.allLogsPath.replace("TOKEN", token));
  }

  public getLog(token: string, logId: number): Observable<CryptoWalletResponse<Log>> {
    return this.http.get<CryptoWalletResponse<Log>>(this.getLogPath.replace("TOKEN", token).replace("ID", logId.toString()));
  }
}