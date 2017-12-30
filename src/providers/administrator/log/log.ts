import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Log } from '../../../entities/log';
import { Response } from '../../../responses/response';

@Injectable()
export class AdministratorLogProvider {

  public static readonly allLogsPath: string = "cryptowallet/administrator/TOKEN/log";
  public static readonly getLogPath: string = "cryptowallet/administrator/TOKEN/log/LOG_ID";

  constructor(private http: HttpClient) {
  }

  public allLogs(token: string): Observable<Response<Array<Log>>> {
    return this.http.get<Response<Array<Log>>>(AdministratorLogProvider.allLogsPath.replace("TOKEN", token));
  }

  public getLog(token: string, logId: number): Observable<Response<Log>> {
    return this.http.get<Response<Log>>(AdministratorLogProvider.getLogPath.replace("TOKEN", token).replace("LOG_ID", logId.toString()));
  }
}