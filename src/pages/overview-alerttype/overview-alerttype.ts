import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertType } from '../../model/alerttype';

import { UpdateAlertTypePage } from '../update-alerttype/update-alerttype';

@Component({
  selector: 'page-overview-alerttype',
  templateUrl: 'overview-alerttype.html',
})
export class OverviewAlertTypePage {

  public alertType: AlertType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alertType = this.navParams.get("alertType");
  }

  public onUpdateAlertTypeButtonClicked(): void {
    this.navCtrl.push(UpdateAlertTypePage, { alertType: this.alertType });
  }
}