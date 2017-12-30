import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';
import { LocalInformationProvider } from '../../providers/local/information/information';

@Component({
  selector: 'page-overview-cryptocurrency',
  templateUrl: 'overview-cryptocurrency.html',
})
export class OverviewCryptocurrencyPage {

  public isAdministrator: boolean = null;
  public cryptocurrency: Cryptocurrency;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewWillEnter(): void {
    this.isAdministrator = this.localInformationProvider.isUserAdministrator();
  }

  public onUpdateCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: this.cryptocurrency });
  }
}