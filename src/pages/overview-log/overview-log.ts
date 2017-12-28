import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Log } from '../../model/log';

@Component({
  selector: 'page-overview-log',
  templateUrl: 'overview-log.html',
})
export class OverviewLogPage {

  public log: Log;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.log = this.navParams.get("log");
  }
}