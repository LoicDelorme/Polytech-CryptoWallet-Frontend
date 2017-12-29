import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';

import { OverviewCryptocurrencyPage } from '../overview-cryptocurrency/overview-cryptocurrency';
import { InsertCryptocurrencyPage } from '../insert-cryptocurrency/insert-cryptocurrency';

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  public filteredCryptocurrencies: Array<Cryptocurrency> = [];
  public allCryptocurrencies: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider) {    
  }

  public ionViewDidEnter(): void {
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onInsertCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(InsertCryptocurrencyPage);
  }

  public onRefreshCryptocurrenciesButtonClicked(): void {
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
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
    this.navCtrl.push(OverviewCryptocurrencyPage, { cryptocurrency: cryptocurrency });
  }
}