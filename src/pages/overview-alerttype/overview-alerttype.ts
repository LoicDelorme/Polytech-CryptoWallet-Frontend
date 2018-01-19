import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateAlertTypePage } from '../update-alerttype/update-alerttype';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-overview-alerttype',
  templateUrl: 'overview-alerttype.html',
})
export class OverviewAlertTypePage {

  public alertType: AlertType;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.alertType = this.navParams.get("alertType");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
      return;
    }

    this.alertType = this.navParams.get("alertType");
  }

  public onUpdateAlertTypeButtonClicked(): void {
    this.navCtrl.push(UpdateAlertTypePage, { alertType: this.alertType });
  }
}