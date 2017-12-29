import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../model/alert';

import { UpdateAlertPage } from '../update-alert/update-alert';

@Component({
  selector: 'page-overview-alert',
  templateUrl: 'overview-alert.html',
})
export class OverviewAlertPage {

  public alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alert = this.navParams.get("alert");
  }

  public onUpdateAlertButtonClicked(): void {
    this.navCtrl.push(UpdateAlertPage, { alert: this.alert });
  }
}