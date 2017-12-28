import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-overview-cryptocurrency',
  templateUrl: 'overview-cryptocurrency.html',
})
export class OverviewCryptocurrencyPage {

  public cryptocurrency: Cryptocurrency;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public onUpdateCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: this.cryptocurrency });
  }

  public onDeleteCryptocurrencyButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this cryptocurrency?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.administratorCryptocurrencyProvider.deleteCryptocurrency(window.localStorage.getItem("user.token.value"), this.cryptocurrency).subscribe(data => {
              console.warn(data);

              this.navCtrl.setRoot(CryptocurrenciesPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}