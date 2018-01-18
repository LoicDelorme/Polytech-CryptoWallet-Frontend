import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Currency } from '../../entities/currency';

import { AdministratorCurrencyProvider } from '../../providers/administrator/currency';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewCurrencyPage } from '../overview-currency/overview-currency';
import { InsertCurrencyPage } from '../insert-currency/insert-currency';

@Component({
  selector: 'page-all-currencies',
  templateUrl: 'all-currencies.html',
})
export class AllCurrenciesPage {

  public filtered: Array<Currency> = [];
  public all: Array<Currency> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private administratorCurrencyProvider: AdministratorCurrencyProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCurrenciesPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.administratorCurrencyProvider.allCurrencies(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertCurrencyButtonClicked(): void {
    this.navCtrl.push(InsertCurrencyPage);
  }

  public onRefreshCurrenciesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((currency: Currency) => {
        return (currency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (currency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCurrencyButtonClicked(currency: Currency): void {
    this.navCtrl.push(OverviewCurrencyPage, { currency: currency });
  }

  public onDeleteCurrencyButtonClicked(currency: Currency): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this currency?',
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
            this.administratorCurrencyProvider.deleteCurrency(this.localStorageProvider.getUserTokenValue(), currency).subscribe(result => {
              this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
              this.refreshData();
            }, error => {
              console.error(error);
              this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
            });
          }
        }
      ]
    }).present();
  }
}