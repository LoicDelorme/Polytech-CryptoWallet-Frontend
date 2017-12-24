import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Log } from '../../model/log';
import { Response } from '../../model/response';

@Injectable()
export class LogProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/logs";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/log/LOG_ID";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/log";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/log/LOG_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/log/LOG_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Log>>> {
    return this.http.get<Response<Array<Log>>>(LogProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public get(token: string, userId: number, logId: number): Observable<Response<Log>> {
    return this.http.get<Response<Log>>(LogProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("LOG_ID", logId.toString()));
  }

  public insert(token: string, userId: number, log: Log): Observable<Response<Log>> {
    return this.http.post<Response<Log>>(LogProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), log);
  }

  public update(token: string, userId: number, log: Log): Observable<Response<Log>> {
    return this.http.put<Response<Log>>(LogProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("LOG_ID", log.id.toString()), log);
  }

  public delete(token: string, userId: number, log: Log): Observable<Response<Log>> {
    return this.http.delete<Response<Log>>(LogProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("LOG_ID", log.id.toString()));
  }
}