import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';
import { SettingForm } from '../../forms/settingform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { SettingsPage } from '../settings/settings';
import { LAZY_LOADED_TOKEN } from 'ionic-angular/util/module-loader';

@Component({
  selector: 'page-update-setting',
  templateUrl: 'update-setting.html',
})
export class UpdateSettingPage {

  public settingForm: SettingForm;
  public settingFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    let setting: Setting = this.navParams.get("setting");

    this.settingForm = new SettingForm();
    this.settingForm.id = setting.id;
    this.settingForm.name = setting.name;
    this.settingForm.theme = setting.theme;
    this.settingForm.userId = setting.userId;

    this.settingFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      theme: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.settingFormGroup.valid) {
      this.registeredUserProvider.updateSetting(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.settingForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(SettingsPage);
      });
    }
  }
}