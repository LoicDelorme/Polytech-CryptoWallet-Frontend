import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Setting } from '../../entities/setting';
import { Theme } from '../../entities/theme';
import { Currency } from '../../entities/currency';
import { ChartPeriod } from '../../entities/chartperiod';
import { SettingForm } from '../../forms/settingform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { RegisteredThemeProvider } from '../../providers/registered/theme';
import { RegisteredCurrencyProvider } from '../../providers/registered/currency';
import { UnregisteredChartPeriodProvider } from '../../providers/unregistered/chartperiod';
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
  public settingForm: SettingForm;
  public allThemes: Array<Theme> = [];
  public allCurrencies: Array<Currency> = [];
  public allChartPeriods: Array<ChartPeriod> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider, private registeredThemeProvider: RegisteredThemeProvider, private registeredCurrencyProvider: RegisteredCurrencyProvider, private unregisteredChartPeriodProvider: UnregisteredChartPeriodProvider) {
    this.settingForm = new SettingForm();
  }

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

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allSettings(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      let setting: Setting = result.data;
      this.localStorageProvider.saveSettingInformation(setting);

      this.settingForm.id = setting.id;
      this.settingForm.themeId = setting.theme.id;
      this.settingForm.currencyId = setting.currency.id;
      this.settingForm.chartPeriodId = setting.chartPeriod.id;

      this.registeredThemeProvider.allThemes(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
        this.allThemes = result.data;

        this.registeredCurrencyProvider.allCurrencies(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
          this.allCurrencies = result.data;

          this.unregisteredChartPeriodProvider.allChartPeriods().subscribe(result => {
            this.allChartPeriods = result.data;
      
            loadingOverlay.dismiss();
          }, error => {
            console.error(error);
            this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
      
            loadingOverlay.dismiss();
          });
        }, error => {
          console.error(error);
          this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

          loadingOverlay.dismiss();
        });
      }, error => {
        console.error(error);
        this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
  
        loadingOverlay.dismiss();
      });
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public updateSettings(): void {
    this.registeredUserProvider.updateSettings(this.localStorageProvider.getUserTokenValue(), this.settingForm).subscribe(result => {
      this.localStorageProvider.saveSettingInformation(result.data);
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
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
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
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

  public onTelegramButtonClicked(): void {
    this.toastCtrl.create({ message: 'Telegram button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onSlackButtonClicked(): void {
    this.toastCtrl.create({ message: 'Slack button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onFacebookButtonClicked(): void {
    this.toastCtrl.create({ message: 'Facebook button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onTwitterButtonClicked(): void {
    this.toastCtrl.create({ message: 'Twitter button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onBlogButtonClicked(): void {
    this.toastCtrl.create({ message: 'Blog button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onReviewButtonClicked(): void {
    this.toastCtrl.create({ message: 'Review button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onShareButtonClicked(): void {
    this.toastCtrl.create({ message: 'Share button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onPrivacyPolicyButtonClicked(): void {
    this.toastCtrl.create({ message: 'Privacy policy button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onTermsAndConditionsButtonClicked(): void {
    this.toastCtrl.create({ message: 'Terms & conditions button clicked!', duration: 3000, position: 'top' }).present();
  }

  public onSupportButtonClicked(): void {
    this.toastCtrl.create({ message: 'Support button clicked!', duration: 3000, position: 'top' }).present();
  }
}