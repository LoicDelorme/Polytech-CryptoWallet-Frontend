import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllSettingsPage } from '../all-settings/all-settings';
import { AllTokensPage } from '../all-tokens/all-tokens';
import { AllLogsPage } from '../all-logs/all-logs';
import { UserOverviewPage } from '../user-overview/user-overview';
import { HomePage } from '../home/home';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public isAdministrator: boolean;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.isAdministrator = this.localInformationProvider.isUserAdministrator();
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: SettingsPage });
    } else {
      this.isAdministrator = this.localInformationProvider.isUserAdministrator();
    }
  }

  public onOverviewSettingsButtonClicked(): void {
    this.navCtrl.push(AllSettingsPage);
  }

  public onOverviewTokensButtonClicked(): void {
    this.navCtrl.push(AllTokensPage);
  }

  public onOverviewLogsButtonClicked(): void {
    this.navCtrl.push(AllLogsPage);
  }

  public onOverviewAccountButtonClicked(): void {
    this.navCtrl.push(UserOverviewPage, { user: this.localInformationProvider.getUser() });
  }

  public onLogOutButtonClicked(): void {
    this.registeredUserProvider.deleteToken(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.localInformationProvider.getToken()).subscribe(data => {
      console.warn(data);

      this.localInformationProvider.clearAllInformation();

      this.navCtrl.setRoot(HomePage);
    }); 
  }

  public onOverviewCryptocurrenciesButtonClicked(): void {
    this.navCtrl.push(AllCryptocurrenciesPage);
  }

  public onOverviewAlertTypesButtonClicked(): void {
    this.navCtrl.push(AllAlertTypesPage);
  }
}