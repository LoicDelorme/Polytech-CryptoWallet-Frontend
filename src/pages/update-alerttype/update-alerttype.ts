import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AlertType } from '../../model/alerttype';
import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-update-alerttype',
  templateUrl: 'update-alerttype.html',
})
export class UpdateAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorAlertTypeProvider: AdministratorAlertTypeProvider) {
    let alertType: AlertType = this.navParams.get("alertType");

    this.alertTypeForm = new AlertTypeForm();
    this.alertTypeForm.id = alertType.id;
    this.alertTypeForm.name = alertType.name;

    this.alertTypeFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.alertTypeFormGroup.valid) {
      this.administratorAlertTypeProvider.updateAlertType(window.localStorage.getItem("user.token.value"), this.alertTypeForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(SettingsPage);
      });
    }
  }
}