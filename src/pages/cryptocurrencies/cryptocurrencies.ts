import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';
import { FavoriteForm } from '../../forms/favoriteform';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { ChartPage } from '../chart/chart';
import { OverviewCryptocurrencyPage } from '../overview-cryptocurrency/overview-cryptocurrency';
import { InsertCryptocurrencyPage } from '../insert-cryptocurrency/insert-cryptocurrency';

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  public isAdministrator: boolean = null;
  public isRegistered: boolean = null;
  public filteredCryptocurrencies: Array<Cryptocurrency> = [];
  public allCryptocurrencies: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {
  }

  public ionViewWillEnter(): void {
    this.isAdministrator = (window.localStorage.getItem("user.administrator") === "true");
    this.isRegistered = (window.localStorage.getItem("user") === "true");
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

  public onCryptocurrencyChartButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: cryptocurrency });
  }

  public onInsertFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.insertFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency, new FavoriteForm()).subscribe(data => {
      console.warn(data);
    });
  }

  public onDeleteCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
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
            this.administratorCryptocurrencyProvider.deleteCryptocurrency(window.localStorage.getItem("user.token.value"), cryptocurrency).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredCryptocurrencies.indexOf(cryptocurrency);
              if (filteredIndex != -1) {
                this.filteredCryptocurrencies.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allCryptocurrencies.indexOf(cryptocurrency);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allCryptocurrencies.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}