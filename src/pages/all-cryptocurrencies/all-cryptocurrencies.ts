import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewCryptocurrencyPage } from '../overview-cryptocurrency/overview-cryptocurrency';
import { InsertCryptocurrencyPage } from '../insert-cryptocurrency/insert-cryptocurrency';

@Component({
  selector: 'page-all-cryptocurrencies',
  templateUrl: 'all-cryptocurrencies.html',
})
export class AllCryptocurrenciesPage {

  public filtered: Array<Cryptocurrency> = [];
  public all: Array<Cryptocurrency> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
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

    this.administratorCryptocurrencyProvider.allCryptocurrencies(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(InsertCryptocurrencyPage);
  }

  public onRefreshCryptocurrenciesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(OverviewCryptocurrencyPage, { cryptocurrency: cryptocurrency });
  }

  public onDeleteCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this cryptocurrency?',
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
            this.administratorCryptocurrencyProvider.deleteCryptocurrency(this.localStorageProvider.getUserTokenValue(), cryptocurrency).subscribe(result => {
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