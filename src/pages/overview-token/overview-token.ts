import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Token } from '../../model/token';

@Component({
  selector: 'page-overview-token',
  templateUrl: 'overview-token.html',
})
export class OverviewTokenPage {

  public token: Token;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.token = this.navParams.get("token");
  }
}