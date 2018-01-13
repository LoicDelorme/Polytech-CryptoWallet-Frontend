import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Setting } from '../../entities/setting';
import { SettingForm } from '../../forms/settingform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorSettingProvider {

  private readonly allSettingsPath: string = "cryptowallet/administrator/TOKEN/setting";
  private readonly getSettingPath: string = "cryptowallet/administrator/TOKEN/setting/ID";
  private readonly updateSettingPath: string = "cryptowallet/administrator/TOKEN/setting/ID";

  constructor(private http: HttpClient) {}

  public allSettings(token: string): Observable<Response<Array<Setting>>> {
    return this.http.get<Response<Array<Setting>>>(this.allSettingsPath.replace("TOKEN", token));
  }

  public getSetting(token: string, settingId: number): Observable<Response<Setting>> {
    return this.http.get<Response<Setting>>(this.getSettingPath.replace("TOKEN", token).replace("ID", settingId.toString()));
  }

  public updateSetting(token: string, settingForm: SettingForm): Observable<Response<Setting>> {
    return this.http.put<Response<Setting>>(this.updateSettingPath.replace("TOKEN", token).replace("ID", settingForm.id.toString()), settingForm);
  }
}