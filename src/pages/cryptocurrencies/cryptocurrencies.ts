import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  allCryptocurrencies : Cryptocurrency[] = [];
  filteredCryptocurrencies : Cryptocurrency[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider) {
    unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onAddButtonClicked(): void {
    console.log("Add button has been clicked");
  }

  public onRefreshButtonClicked(): void {
    console.log("Refresh button has been clicked");
  }

  public onFilterFieldUpdated(event: any): void {
    this.filteredCryptocurrencies = this.allCryptocurrencies;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredCryptocurrencies = this.filteredCryptocurrencies.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onAnalyticsButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.log("Analytics button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }

  public onFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.log("Favorite button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }
}