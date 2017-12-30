import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Setting } from '../../entities/setting';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewSettingPage } from '../overview-setting/overview-setting';
import { InsertSettingPage } from '../insert-setting/insert-setting';

@Component({
  selector: 'page-all-settings',
  templateUrl: 'all-settings.html',
})
export class AllSettingsPage {

  public filteredSettings: Array<Setting> = [];
  public allSettings: Array<Setting> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllSettingsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allSettings(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allSettings = data.data;
        this.filteredSettings = data.data;
      });
    }
  }

  public onInsertSettingButtonClicked(): void {
    this.navCtrl.push(InsertSettingPage);
  }

  public onRefreshSettingsButtonClicked(): void {
    this.registeredUserProvider.allSettings(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

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

  public onDeleteSettingButtonClicked(setting: Setting): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this setting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteSetting(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), setting).subscribe(data => {
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
      ]
    });

    confirmationAlert.present();
  }
}