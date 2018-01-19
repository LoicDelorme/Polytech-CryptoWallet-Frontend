import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UserOverviewPage } from '../user-overview/user-overview';
import { AllTokensPage } from '../all-tokens/all-tokens';
import { AllDevicesPage } from '../all-devices/all-devices';
import { AllLogsPage } from '../all-logs/all-logs';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';
import { AllCurrenciesPage } from '../all-currencies/all-currencies';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';
import { AllChartPeriodsPage } from '../all-chartperiods/all-chartperiods';
import { AllThemesPage } from '../all-themes/all-themes';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public isAdministrator: boolean;
 
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: SettingsPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    this.isAdministrator = this.localStorageProvider.isUserAdministrator();
  }

  public onOverviewAccountButtonClicked(): void {
    this.navCtrl.push(UserOverviewPage, { user: this.localStorageProvider.getUser() });
  }

  public onLogOutButtonClicked(): void {
    this.registeredUserProvider.deleteToken(this.localStorageProvider.getUserTokenValue(), this.localStorageProvider.getToken()).subscribe(result => {
      this.localStorageProvider.clearAllInformation();

      this.navCtrl.setRoot(HomePage);
    }, error => {
      console.error(error);

      let toastOverlay = this.toastCtrl.create({
        message: 'An error occured...',
        duration: 3000,
        position: 'top'
      });

      toastOverlay.present();
    }); 
  }

  public onOverviewTokensButtonClicked(): void {
    this.navCtrl.push(AllTokensPage);
  }

  public onOverviewDevicesButtonClicked(): void {
    this.navCtrl.push(AllDevicesPage);
  }

  public onOverviewLogsButtonClicked(): void {
    this.navCtrl.push(AllLogsPage);
  }

  public onOverviewCryptocurrenciesButtonClicked(): void {
    this.navCtrl.push(AllCryptocurrenciesPage);
  }

  public onOverviewCurrenciesButtonClicked(): void {
    this.navCtrl.push(AllCurrenciesPage);
  }

  public onOverviewAlertTypesButtonClicked(): void {
    this.navCtrl.push(AllAlertTypesPage);
  }

  public onOverviewChartPeriodsButtonClicked(): void {
    this.navCtrl.push(AllChartPeriodsPage);
  }

  public onOverviewThemesButtonClicked(): void {
    this.navCtrl.push(AllThemesPage);
  }
}