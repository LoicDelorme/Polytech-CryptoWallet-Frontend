import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';
import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  public isAdministrator: boolean = null;
  public filteredCryptocurrencies : Cryptocurrency[] = [];

  private allCryptocurrencies : Cryptocurrency[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider) {
    this.isAdministrator = (window.localStorage.getItem("user.administrator") === "true");
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onAddButtonClicked(): void {
    console.log("Add button has been clicked");
  }

  public onRefreshButtonClicked(): void {
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
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
    this.registeredUserProvider.insertFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency).subscribe(data => {
      console.log(data);
    });
  }
}