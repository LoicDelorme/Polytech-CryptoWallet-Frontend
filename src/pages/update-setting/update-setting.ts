import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../entities/setting';
import { SettingForm } from '../../forms/settingform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllSettingsPage } from '../all-settings/all-settings';

@Component({
  selector: 'page-update-setting',
  templateUrl: 'update-setting.html',
})
export class UpdateSettingPage {

  public settingForm: SettingForm;
  public settingFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    let setting: Setting = this.navParams.get("setting");

    this.settingForm = new SettingForm();
    this.settingForm.id = setting.id;
    this.settingForm.name = setting.name;
    this.settingForm.theme = setting.theme;
    this.settingForm.chartPeriod = setting.chartPeriod;
    this.settingForm.userId = setting.userId;

    this.settingFormGroup = formBuilder.group({
      name: [setting.name, Validators.compose([Validators.required, Validators.maxLength(250)])],
      theme: [setting.theme, Validators.compose([Validators.required, Validators.maxLength(250)])],
      chartPeriod: [setting.chartPeriod, Validators.compose([Validators.required, Validators.pattern("^[0-9]{1,2}[SMHDMY]$"), Validators.maxLength(3)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllSettingsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.settingFormGroup.valid) {
      this.registeredUserProvider.updateSetting(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.settingForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.getPrevious().data.setting = data.data;
        this.navCtrl.pop();
      });
    }
  }
}