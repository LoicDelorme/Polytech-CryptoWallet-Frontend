import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewSettingPage } from '../overview-setting/overview-setting';
import { InsertSettingPage } from '../insert-setting/insert-setting';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public isRegistered: boolean = null;
  public filteredSettings: Array<Setting> = [];
  public allSettings: Array<Setting> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: SettingsPage });
    } else {
      this.registeredUserProvider.allSettings(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
        this.allSettings = data.data;
        this.filteredSettings = data.data;
      });
    }
  }

  public onInsertSettingButtonClicked(): void {
    this.navCtrl.push(InsertSettingPage);
  }

  public onRefreshSettingsButtonClicked(): void {
    this.registeredUserProvider.allSettings(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allSettings = data.data;
      this.filteredSettings = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredSettings = this.allSettings;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredSettings = this.filteredSettings.filter((setting: Setting) => {
        return setting.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewSettingButtonClicked(setting: Setting): void {
    this.navCtrl.push(OverviewSettingPage, { setting: setting });
  }
}