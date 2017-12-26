import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';
import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public isRegistered: boolean = null;
  public filteredSettings: Setting[] = [];
  public allSettings: Setting[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.push(AuthenticationPage);
    }

    this.registeredUserProvider.allSettings(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allSettings = data.data;
      this.filteredSettings = data.data;
    });
  }

  public onInsertSettingButtonClicked(): void {
    console.warn("Insert setting button has been clicked");
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
    console.warn("Setting chart button has been clicked for the following setting: " + setting.name);
  }

  public onUpdateSettingButtonClicked(setting: Setting): void {
    console.warn("Update setting button has been clicked for the following setting: " + setting.name);
  }

  public onDeleteSettingButtonClicked(setting: Setting): void {
    console.warn("Delete setting button has been clicked for the following setting: " + setting.name);
  }
}