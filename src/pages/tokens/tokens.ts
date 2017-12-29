import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Token } from '../../model/token';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewTokenPage } from '../overview-token/overview-token';

@Component({
  selector: 'page-tokens',
  templateUrl: 'tokens.html',
})
export class TokensPage {

  public isRegistered: boolean = null;
  public filteredTokens: Array<Token> = [];
  public allTokens: Array<Token> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: TokensPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.isRegistered) {
      this.registeredUserProvider.allTokens(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
        this.allTokens = data.data;
        this.filteredTokens = data.data;
      });
    }
  }

  public onRefreshTokensButtonClicked(): void {
    this.registeredUserProvider.allTokens(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allTokens = data.data;
      this.filteredTokens = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredTokens = this.allTokens;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredTokens = this.filteredTokens.filter((token: Token) => {
        return token.value.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewTokenButtonClicked(token: Token): void {
    this.navCtrl.push(OverviewTokenPage, { token: token });
  }

  public onDeleteTokenButtonClicked(token: Token): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this token?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteToken(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), token).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredTokens.indexOf(token);
              if (filteredIndex != -1) {
                this.filteredTokens.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allTokens.indexOf(token);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allTokens.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}