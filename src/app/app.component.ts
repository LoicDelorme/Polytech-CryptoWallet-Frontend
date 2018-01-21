import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as moment from 'moment';

import { LocalStorageProvider } from '../providers/storage/localstorage';

import { HomePage } from '../pages/home/home';
import { AllFavoritesPage } from '../pages/all-favorites/all-favorites';
import { AllWalletsPage } from '../pages/all-wallets/all-wallets';
import { AllAlertsPage } from '../pages/all-alerts/all-alerts';
import { SettingsPage } from '../pages/settings/settings';
import { UserAuthenticationPage } from '../pages/user-authentication/user-authentication';
import { UserSubscriptionPage } from '../pages/user-subscription/user-subscription';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') navCtrl;

  public rootPage: any = HomePage;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private menuCtrl: MenuController, public localStorageProvider: LocalStorageProvider) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.navCtrl.viewWillEnter.subscribe((view) => {
        if (moment().isAfter(moment(this.localStorageProvider.getUserTokenEndDate(), "DD/MM/YYYY HH:mm:ss"))) {
          this.localStorageProvider.clearAllInformation();
          this.navCtrl.setRoot(HomePage);
        }
      });
    });
  }

  public onHomeButtonClicked(): void {
    this.onPageButtonClicked(HomePage);
  }

  public onFavoritesButtonClicked(): void {
    this.onPageButtonClicked(AllFavoritesPage);
  }

  public onWalletsButtonClicked(): void {
    this.onPageButtonClicked(AllWalletsPage);
  }

  public onAlertsButtonClicked(): void {
    this.onPageButtonClicked(AllAlertsPage);
  }

  public onSettingsButtonClicked(): void {
    this.onPageButtonClicked(SettingsPage);
  }

  public onLogInButtonClicked(): void {
    this.onPageButtonClicked(UserAuthenticationPage);
  }

  public onSubscribeButtonClicked(): void {
    this.onPageButtonClicked(UserSubscriptionPage);
  }

  private onPageButtonClicked(rootPage: any): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(rootPage);
  }
}