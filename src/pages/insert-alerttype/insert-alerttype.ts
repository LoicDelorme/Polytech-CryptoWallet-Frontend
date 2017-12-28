import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-insert-alerttype',
  templateUrl: 'insert-alerttype.html',
})
export class InsertAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorAlertTypeProvider: AdministratorAlertTypeProvider) {
    this.alertTypeForm = new AlertTypeForm();
    this.alertTypeFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.alertTypeFormGroup.valid) {
      this.administratorAlertTypeProvider.insertAlertType(window.localStorage.getItem("user.token.value"), this.alertTypeForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(SettingsPage);
      });
    }
  }
}