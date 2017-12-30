import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';
import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-update-alerttype',
  templateUrl: 'update-alerttype.html',
})
export class UpdateAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorAlertTypeProvider: AdministratorAlertTypeProvider, public localInformationProvider: LocalInformationProvider) {
    let alertType: AlertType = this.navParams.get("alertType");

    this.alertTypeForm = new AlertTypeForm();
    this.alertTypeForm.id = alertType.id;
    this.alertTypeForm.name = alertType.name;

    this.alertTypeFormGroup = formBuilder.group({
      name: [alertType.name, Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.alertTypeFormGroup.valid) {
      this.administratorAlertTypeProvider.updateAlertType(this.localInformationProvider.getUserTokenValue(), this.alertTypeForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AllAlertTypesPage);
      });
    }
  }
}