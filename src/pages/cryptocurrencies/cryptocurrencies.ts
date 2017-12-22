import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { CryptocurrenciesProvider } from '../../providers/cryptocurrencies/cryptocurrencies';

/**
 * Generated class for the CryptocurrenciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cryptocurrencies',
  templateUrl: 'cryptocurrencies.html',
})
export class CryptocurrenciesPage {

  allCryptocurrencies : Cryptocurrency[] = [];

  filteredCryptocurrencies : Cryptocurrency[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cryptocurrenciesProvider: CryptocurrenciesProvider) {
    let cryptocurrencies = cryptocurrenciesProvider.getAll();
    
    this.allCryptocurrencies = cryptocurrencies;
    this.filteredCryptocurrencies = cryptocurrencies;
  }

  getCryptocurrencies(event: any) {
    let filter = event.target.value.toLowerCase();
    if (filter != null && filter.trim() != '') {
      this.filteredCryptocurrencies = this.allCryptocurrencies.filter((cryptocurrency) => {
        return (cryptocurrency.getName().toLowerCase().indexOf(filter) > -1) || (cryptocurrency.getSymbol().toLowerCase().indexOf(filter) > -1);
      });
    } else {
      this.filteredCryptocurrencies = this.allCryptocurrencies;
    }
  }
}