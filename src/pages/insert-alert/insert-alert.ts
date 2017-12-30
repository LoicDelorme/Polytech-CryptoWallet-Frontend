import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { AlertType } from '../../entities/alerttype';
import { AlertForm } from '../../forms/alertform';

import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype/alerttype';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-insert-alert',
  templateUrl: 'insert-alert.html',
})
export class InsertAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public registeredAlertTypeProvider: RegisteredAlertTypeProvider, public localInformationProvider: LocalInformationProvider) {
    this.alertForm = new AlertForm();
    this.alertForm.userId = this.localInformationProvider.getUserId();

    this.alertFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      threshold: ['', Validators.compose([Validators.required])],
      oneShot: [false],
      active: [false],
      cryptocurrencyId: ['', Validators.compose([Validators.required])],
      typeId: ['', Validators.compose([Validators.required])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allFavorites(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allFavorites = data.data;
      });

      this.registeredAlertTypeProvider.allAlertTypes(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
        console.warn(data);

        this.allTypes = data.data;
      });
    }
  }

  public onSubmit(value: any): void {
    if (this.alertFormGroup.valid) {
      this.registeredUserProvider.insertAlert(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.alertForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AllAlertsPage);
      });
    }
  }

  public updateName(): void {
    let favorite: Cryptocurrency = this.allFavorites.find(favorite => { return favorite.id === this.alertForm.cryptocurrencyId; });
    let type: AlertType = this.allTypes.find(type => { return type.id === this.alertForm.typeId; });
    let threshold: number = this.alertForm.threshold;

    this.alertForm.name = (favorite ? favorite.name : "\"Cryptocurrency\"") + " " + (type ? type.name : "\"Type\"") + " " + (threshold ? threshold : "\"Threshold\"");
  }
}