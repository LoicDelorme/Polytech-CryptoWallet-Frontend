import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AlertForm } from '../../forms/alertform';
import { Cryptocurrency } from '../../model/cryptocurrency';
import { AlertType } from '../../model/alerttype';

import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype/alerttype';
import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AlertsPage } from '../alerts/alerts';

@Component({
  selector: 'page-insert-alert',
  templateUrl: 'insert-alert.html',
})
export class InsertAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public registeredAlertTypeProvider: RegisteredAlertTypeProvider) {
    this.alertForm = new AlertForm();
    this.alertForm.userId = parseInt(window.localStorage.getItem("user.id"));

    this.alertFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      threshold: ['', Validators.compose([Validators.required])],
      oneShot: [false],
      active: [false],
      cryptocurrencyId: ['', Validators.compose([Validators.required])],
      typeId: ['', Validators.compose([Validators.required])]
    });
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavorites = data.data;
    });
    this.registeredAlertTypeProvider.allAlertTypes(window.localStorage.getItem("user.token.value")).subscribe(data => {
      this.allTypes = data.data;
    });
  }

  public onSubmit(value: any): void {
    if (this.alertFormGroup.valid) {
      this.registeredUserProvider.insertAlert(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.alertForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AlertsPage);
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