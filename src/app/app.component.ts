import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  public rootPage: any = HomePage;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private navCtrl: NavController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public onHomeButtonClicked(): void {
    this.navCtrl.setRoot(HomePage);
  }

  public onFavoritesButtonClicked(): void {
    this.navCtrl.setRoot(AllFavoritesPage);
  }

  public onWalletsButtonClicked(): void {
    this.navCtrl.setRoot(AllWalletsPage);
  }

  public onAlertsButtonClicked(): void {
    this.navCtrl.setRoot(AllAlertsPage);
  }

  public onSettingsButtonClicked(): void {
    this.navCtrl.setRoot(SettingsPage);
  }

  public onLogInButtonClicked(): void {
    this.navCtrl.setRoot(UserAuthenticationPage);
  }

  public onSubscribeButtonClicked(): void {
    this.navCtrl.setRoot(UserSubscriptionPage);
  }
}