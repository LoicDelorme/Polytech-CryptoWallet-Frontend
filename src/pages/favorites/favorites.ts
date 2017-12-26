import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';
import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public filteredFavoriteCryptocurrencies : Cryptocurrency[] = [];

  private allFavoriteCryptocurrencies : Cryptocurrency[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider) {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavoriteCryptocurrencies = data.data;
      this.filteredFavoriteCryptocurrencies = data.data;
    });
  }

  public onRefreshButtonClicked(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavoriteCryptocurrencies = data.data;
      this.filteredFavoriteCryptocurrencies = data.data;
    });
  }

  public onFilterFieldUpdated(event: any): void {
    this.filteredFavoriteCryptocurrencies = this.allFavoriteCryptocurrencies;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredFavoriteCryptocurrencies = this.filteredFavoriteCryptocurrencies.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onAnalyticsButtonClicked(cryptocurrency: Cryptocurrency): void {
    console.log("Analytics button has been clicked for the following cryptocurrency: " + cryptocurrency.symbol);
  }

  public onDeleteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.deleteFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency).subscribe(data => {
      console.log(data);

      let filteredIndex: number = this.filteredFavoriteCryptocurrencies.indexOf(cryptocurrency);
      if (filteredIndex != -1) {
        this.filteredFavoriteCryptocurrencies.splice(filteredIndex, 1);
      }

      let allIndex: number = this.allFavoriteCryptocurrencies.indexOf(cryptocurrency);
      if (allIndex != -1 && allIndex != filteredIndex) {
        this.allFavoriteCryptocurrencies.splice(allIndex, 1);
      }
    });
  }
}