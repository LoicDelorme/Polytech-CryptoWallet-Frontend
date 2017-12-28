import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Setting } from '../../model/setting';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-insert-setting',
  templateUrl: 'insert-setting.html',
})
export class InsertSettingPage {

  public settingForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.settingForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      theme: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.settingForm.valid) {
      let setting: Setting = new Setting();
      setting.name = value.name;
      setting.theme = value.theme;
      setting.userId = parseInt(window.localStorage.getItem("user.id"));

      this.registeredUserProvider.insertSetting(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), setting).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(SettingsPage);
      });
    }
  }
}