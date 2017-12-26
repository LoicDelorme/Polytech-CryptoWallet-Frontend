import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Setting } from '../../../model/setting';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorSettingProvider {

  public static readonly allSettingsPath: string = "cryptowallet/administrator/TOKEN/setting";
  public static readonly getSettingPath: string = "cryptowallet/administrator/TOKEN/setting/SETTING_ID";
  public static readonly insertSettingPath: string = "cryptowallet/administrator/TOKEN/setting";
  public static readonly updateSettingPath: string = "cryptowallet/administrator/TOKEN/setting/SETTING_ID";
  public static readonly deleteSettingPath: string = "cryptowallet/administrator/TOKEN/setting/SETTING_ID";

  constructor(private http: HttpClient) {
  }

  public allSettings(token: string): Observable<Response<Array<Setting>>> {
    return this.http.get<Response<Array<Setting>>>(AdministratorSettingProvider.allSettingsPath.replace("TOKEN", token));
  }

  public getSetting(token: string, settingId: number): Observable<Response<Setting>> {
    return this.http.get<Response<Setting>>(AdministratorSettingProvider.getSettingPath.replace("TOKEN", token).replace("SETTING_ID", settingId.toString()));
  }

  public insertSetting(token: string, setting: Setting): Observable<Response<Setting>> {
    return this.http.post<Response<Setting>>(AdministratorSettingProvider.insertSettingPath.replace("TOKEN", token), setting);
  }

  public updateSetting(token: string, setting: Setting): Observable<Response<Setting>> {
    return this.http.put<Response<Setting>>(AdministratorSettingProvider.updateSettingPath.replace("TOKEN", token).replace("SETTING_ID", setting.id.toString()), setting);
  }

  public deleteSetting(token: string, setting: Setting): Observable<Response<Setting>> {
    return this.http.delete<Response<Setting>>(AdministratorSettingProvider.deleteSettingPath.replace("TOKEN", token).replace("SETTING_ID", setting.id.toString()));
  }
}