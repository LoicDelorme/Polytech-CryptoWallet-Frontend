import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private menuCtrl: MenuController) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public onHomeButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(HomePage);
  }

  public onFavoritesButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(AllFavoritesPage);
  }

  public onWalletsButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(AllWalletsPage);
  }

  public onAlertsButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(AllAlertsPage);
  }

  public onSettingsButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(SettingsPage);
  }

  public onLogInButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(UserAuthenticationPage);
  }

  public onSubscribeButtonClicked(): void {
    this.menuCtrl.close();
    this.navCtrl.setRoot(UserSubscriptionPage);
  }
}