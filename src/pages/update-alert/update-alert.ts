import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../entities/alert';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { AlertType } from '../../entities/alerttype';
import { AlertForm } from '../../forms/alertform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype/alerttype';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-update-alert',
  templateUrl: 'update-alert.html',
})
export class UpdateAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public registeredAlertTypeProvider: RegisteredAlertTypeProvider, public localInformationProvider: LocalInformationProvider) {
    let alert: Alert = this.navParams.get("alert");

    this.alertForm = new AlertForm();
    this.alertForm.id = alert.id;
    this.alertForm.name = alert.name;
    this.alertForm.threshold = alert.threshold;
    this.alertForm.oneShot = alert.oneShot;
    this.alertForm.active = alert.active;
    this.alertForm.userId = alert.userId;
    this.alertForm.cryptocurrencyId = alert.cryptocurrency.id;
    this.alertForm.typeId = alert.type.id;

    this.alertFormGroup = formBuilder.group({
      name: [alert.name, Validators.compose([Validators.required, Validators.maxLength(250)])],
      cryptocurrencyId: [alert.cryptocurrency.id, Validators.compose([Validators.required])],
      typeId: [alert.type.id, Validators.compose([Validators.required])],
      threshold: [alert.threshold, Validators.compose([Validators.required])],
      oneShot: [alert.oneShot],
      active: [alert.active]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
    }
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allFavorites(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

      this.allFavorites = data.data;
      this.updateName();
    });

    this.registeredAlertTypeProvider.allAlertTypes(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
      console.warn(data);

      this.allTypes = data.data;
      this.updateName();
    });
  }

  public onSubmit(value: any): void {
    if (this.alertFormGroup.valid) {
      this.registeredUserProvider.updateAlert(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.alertForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.getPrevious().data.alert = data.data;
        this.navCtrl.pop();
      });
    }
  }

  public updateName(): void {
    let favorite: Cryptocurrency = this.allFavorites.find(favorite => { return favorite.id == this.alertForm.cryptocurrencyId; });
    let type: AlertType = this.allTypes.find(type => { return type.id == this.alertForm.typeId; });
    let threshold: number = this.alertForm.threshold;

    this.alertForm.name = (favorite ? favorite.name : "\"Cryptocurrency\"") + " " + (type ? type.name : "\"Type\"") + " " + (threshold ? threshold : "\"Threshold\"");
  }
}