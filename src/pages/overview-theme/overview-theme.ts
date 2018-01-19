import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Theme } from '../../entities/theme';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateThemePage } from '../update-theme/update-theme';
import { AllThemesPage } from '../all-themes/all-themes';

@Component({
  selector: 'page-overview-theme',
  templateUrl: 'overview-theme.html',
})
export class OverviewThemePage {

  public theme: Theme;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.theme = this.navParams.get("theme");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllThemesPage });
      return;
    }

    this.theme = this.navParams.get("theme");
  }

  public onUpdateThemeButtonClicked(): void {
    this.navCtrl.push(UpdateThemePage, { theme: this.theme });
  }
}