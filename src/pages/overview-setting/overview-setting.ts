import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';

@Component({
  selector: 'page-overview-setting',
  templateUrl: 'overview-setting.html',
})
export class OverviewSettingPage {

  public setting: Setting;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.setting = this.navParams.get("setting");
  }
}