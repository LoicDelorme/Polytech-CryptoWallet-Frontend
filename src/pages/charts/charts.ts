import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  public cryptocurrency: Cryptocurrency;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }
}