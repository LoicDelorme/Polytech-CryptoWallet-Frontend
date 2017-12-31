import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../entities/setting';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateSettingPage } from '../update-setting/update-setting';
import { AllSettingsPage } from '../all-settings/all-settings';

@Component({
  selector: 'page-overview-setting',
  templateUrl: 'overview-setting.html',
})
export class OverviewSettingPage {

  public setting: Setting;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllSettingsPage });
    } else {
      this.setting = this.navParams.get("setting");
    }
  }

  public onUpdateSettingButtonClicked(): void {
    this.navCtrl.push(UpdateSettingPage, { setting: this.setting });
  }
}