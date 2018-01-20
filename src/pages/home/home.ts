import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ItemSliding } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { FavoriteForm } from '../../forms/favoriteform';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public isRegistered: boolean = null;
  public filtered: Array<Cryptocurrency> = [];
  public all: Array<Cryptocurrency> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    this.isRegistered = this.localStorageProvider.isUserRegistered();
  }

  public ionViewDidEnter(): void {
    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onRefreshCryptocurrenciesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.filtered.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: cryptocurrency });
  }

  public onInsertFavoriteButtonClicked(cryptocurrency: Cryptocurrency, slidingItem: ItemSliding): void {
    slidingItem.close();

    this.registeredUserProvider.insertFavorite(this.localStorageProvider.getUserTokenValue(), cryptocurrency, new FavoriteForm()).subscribe(result => {
      this.toastCtrl.create({ message: 'Your favorite was successfully added!', duration: 3000, position: 'top' }).present();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}