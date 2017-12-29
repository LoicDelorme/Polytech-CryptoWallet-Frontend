import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewCryptocurrencyPage } from '../overview-cryptocurrency/overview-cryptocurrency';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public isRegistered: boolean = null;
  public filteredFavorites: Array<Cryptocurrency> = [];
  public allFavorites: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: FavoritesPage });
    } else {
      this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
        this.allFavorites = data.data;
        this.filteredFavorites = data.data;
      });
    }
  }

  public onRefreshFavoritesButtonClicked(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavorites = data.data;
      this.filteredFavorites = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredFavorites = this.allFavorites;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredFavorites = this.filteredFavorites.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(OverviewCryptocurrencyPage, { cryptocurrency: cryptocurrency });
  }

  public onDeleteFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.deleteFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency).subscribe(data => {
      console.warn(data);

      let filteredIndex: number = this.filteredFavorites.indexOf(cryptocurrency);
      if (filteredIndex != -1) {
        this.filteredFavorites.splice(filteredIndex, 1);
      }

      let allIndex: number = this.allFavorites.indexOf(cryptocurrency);
      if (allIndex != -1 && allIndex != filteredIndex) {
        this.allFavorites.splice(allIndex, 1);
      }
    });
  }
}