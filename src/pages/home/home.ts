import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { FavoriteForm } from '../../forms/favoriteform';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public isRegistered: boolean = null;
  public filteredCryptocurrencies: Array<Cryptocurrency> = [];
  public allCryptocurrencies: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = this.localInformationProvider.isUserRegistered();
  }

  public ionViewDidEnter(): void {
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      console.warn(data);

      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onRefreshCryptocurrenciesButtonClicked(): void {
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      console.warn(data);

      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredCryptocurrencies = this.allCryptocurrencies;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredCryptocurrencies = this.filteredCryptocurrencies.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: cryptocurrency });
  }

  public onInsertFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.insertFavorite(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), cryptocurrency, new FavoriteForm()).subscribe(data => {
      console.warn(data);
    });
  }
}