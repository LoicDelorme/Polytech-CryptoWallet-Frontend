import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewSettingPage } from '../overview-setting/overview-setting';
import { InsertSettingPage } from '../insert-setting/insert-setting';
import { UpdateSettingPage } from '../update-setting/update-setting';

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
    }
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allSettings(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allSettings = data.data;
      this.filteredSettings = data.data;
    });
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

  public onSettingOverviewButtonClicked(setting: Setting): void {
    this.navCtrl.push(OverviewSettingPage, { setting: setting });
  }

  public onUpdateSettingButtonClicked(setting: Setting): void {
    this.navCtrl.push(UpdateSettingPage, { setting: setting });
  }

  public onDeleteSettingButtonClicked(setting: Setting): void {
    this.registeredUserProvider.deleteSetting(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), setting).subscribe(data => {
      console.warn(data);

      let filteredIndex: number = this.filteredSettings.indexOf(setting);
      if (filteredIndex != -1) {
        this.filteredSettings.splice(filteredIndex, 1);
      }

      let allIndex: number = this.allSettings.indexOf(setting);
      if (allIndex != -1 && allIndex != filteredIndex) {
        this.allSettings.splice(allIndex, 1);
      }
    });
  }
}