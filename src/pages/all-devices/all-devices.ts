import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Device } from '../../entities/device';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewDevicePage } from '../overview-device/overview-device';

@Component({
  selector: 'page-all-devices',
  templateUrl: 'all-devices.html',
})
export class AllDevicesPage {

  public filtered: Array<Device> = [];
  public all: Array<Device> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllDevicesPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allDevices(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onRefreshDevicesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((device: Device) => {
        return (device.platform.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (device.uuid.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewDeviceButtonClicked(device: Device): void {
    this.navCtrl.push(OverviewDevicePage, { device: device });
  }

  public onDeleteDeviceButtonClicked(device: Device): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this device?',
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
            this.registeredUserProvider.deleteDevice(this.localStorageProvider.getUserTokenValue(), device).subscribe(result => {
              this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
              this.refreshData();
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