import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { User } from '../../entities/user';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UserUpdatePage } from '../user-update/user-update';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-user-overview',
  templateUrl: 'user-overview.html',
})
export class UserOverviewPage {

  public user: User;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.user = this.navParams.get("user");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: HomePage });
      return;
    }

    this.user = this.navParams.get("user");
  }

  public onUpdateUserButtonClicked(): void {
    this.navCtrl.push(UserUpdatePage, { user: this.user });
  }

  public onDeleteUserButtonClicked(): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteUser(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
              this.toastCtrl.create({ message: 'Your account was successfully deleted!', duration: 3000, position: 'top' }).present();
              this.localStorageProvider.clearAllInformation();
              this.navCtrl.setRoot(HomePage);
            }, error => {
              console.error(error);
              this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
            });
          }
        }
      ]
    }).present();
  }
}