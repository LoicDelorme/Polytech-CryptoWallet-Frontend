import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-all-favorites',
  templateUrl: 'all-favorites.html',
})
export class AllFavoritesPage {

  public filteredFavorites: Array<Cryptocurrency> = [];
  public allFavorites: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllFavoritesPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allFavorites(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allFavorites = data.data;
        this.filteredFavorites = data.data;
      });
    }
  }

  public onRefreshFavoritesButtonClicked(): void {
    this.registeredUserProvider.allFavorites(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

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

  public onOverviewFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: cryptocurrency });
  }

  public onDeleteFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this favorite?',
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
            this.registeredUserProvider.deleteFavorite(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), cryptocurrency).subscribe(data => {
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
      ]
    });

    confirmationAlert.present();
  }
}