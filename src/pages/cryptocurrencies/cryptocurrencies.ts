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

  public isRegistered: boolean = null;
  public isAdministrator: boolean = null;
  public filteredCryptocurrencies : Cryptocurrency[] = [];
  public allCryptocurrencies : Cryptocurrency[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider) {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    this.isAdministrator = (window.localStorage.getItem("user.administrator") === "true");
    this.unregisteredCryptocurrencyProvider.allCryptocurrencies().subscribe(data => {
      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onInsertCryptocurrencyButtonClicked(): void {
    console.warn("Insert cryptocurrency button has been clicked");
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

  public onCryptocurrencyChartButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.warn("Cryptocurrency chart button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }

  public onInsertFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.insertFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency).subscribe(data => {
      console.warn(data);
    });
  }

  public onUpdateCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.warn("Update cryptocurrency button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }

  public onDeleteCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.warn("Delete cryptocurrency button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }
}