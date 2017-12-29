import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';

@Component({
  selector: 'page-overview-cryptocurrency',
  templateUrl: 'overview-cryptocurrency.html',
})
export class OverviewCryptocurrencyPage {

  public cryptocurrency: Cryptocurrency;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public onUpdateCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: this.cryptocurrency });
  }
}