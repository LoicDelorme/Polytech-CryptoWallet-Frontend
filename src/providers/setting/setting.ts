import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Setting } from '../../model/setting';
import { Response } from '../../model/response';

@Injectable()
export class SettingProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/settings";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/setting/SETTING_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Setting>>> {
    return this.http.get<Response<Array<Setting>>>(SettingProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public get(token: string, userId: number, settingId: number): Observable<Response<Setting>> {
    return this.http.get<Response<Setting>>(SettingProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", settingId.toString()));
  }

  public insert(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.post<Response<Setting>>(SettingProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), setting);
  }

  public update(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.put<Response<Setting>>(SettingProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", setting.id.toString()), setting);
  }

  public delete(token: string, userId: number, setting: Setting): Observable<Response<Setting>> {
    return this.http.delete<Response<Setting>>(SettingProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("SETTING_ID", setting.id.toString()));
  }
}