import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { InsertCryptocurrencyPage } from '../insert-cryptocurrency/insert-cryptocurrency';
import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';
import { ChartPage } from '../chart/chart';

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  public isRegistered: boolean = null;
  public isAdministrator: boolean = null;
  public filteredCryptocurrencies: Array<Cryptocurrency> = [];
  public allCryptocurrencies: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {    
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    this.isAdministrator = (window.localStorage.getItem("user.administrator") === "true");
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

  public onCryptocurrencyChartButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(ChartPage, { cryptocurrency: cryptocurrency });
  }

  public onInsertFavoriteButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.registeredUserProvider.insertFavorite(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), cryptocurrency).subscribe(data => {
      console.warn(data);
    });
  }

  public onUpdateCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: cryptocurrency });
  }

  public onDeleteCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
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