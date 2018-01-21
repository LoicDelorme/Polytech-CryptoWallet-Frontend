import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-all-favorites',
  templateUrl: 'all-favorites.html',
})
export class AllFavoritesPage {

  public filtered: Array<Cryptocurrency> = [];
  public all: Array<Cryptocurrency> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllFavoritesPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allFavorites(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onRefreshFavoritesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((favorite: Cryptocurrency) => {
        return (favorite.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (favorite.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewFavoriteButtonClicked(favorite: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: favorite });
  }

  public onDeleteFavoriteButtonClicked(favorite: Cryptocurrency): void {
    this.alertCtrl.create({
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
            this.registeredUserProvider.deleteFavorite(this.localStorageProvider.getUserTokenValue(), favorite).subscribe(result => {
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