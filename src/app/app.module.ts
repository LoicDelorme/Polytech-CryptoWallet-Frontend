import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { CryptocurrenciesPage } from '../pages/cryptocurrencies/cryptocurrencies';
import { FavoritesPage } from '../pages/favorites/favorites';
import { WalletsPage } from '../pages/wallets/wallets';
import { AlertsPage } from '../pages/alerts/alerts';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { ChartPage } from '../pages/chart/chart';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { OverviewWalletPage } from '../pages/overview-wallet/overview-wallet';
import { InsertWalletPage } from '../pages/insert-wallet/insert-wallet';
import { UpdateWalletPage } from '../pages/update-wallet/update-wallet';

import { AdministratorAlertProvider } from '../providers/administrator/alert/alert';
import { AdministratorAlertTypeProvider } from '../providers/administrator/alerttype/alerttype';
import { AdministratorAssetProvider } from '../providers/administrator/asset/asset';
import { AdministratorCryptocurrencyProvider } from '../providers/administrator/cryptocurrency/cryptocurrency';
import { AdministratorFavoriteProvider } from '../providers/administrator/favorite/favorite';
import { AdministratorLogProvider } from '../providers/administrator/log/log';
import { AdministratorSettingProvider } from '../providers/administrator/setting/setting';
import { AdministratorTokenProvider } from '../providers/administrator/token/token';
import { AdministratorUserProvider } from '../providers/administrator/user/user';
import { AdministratorWalletProvider } from '../providers/administrator/wallet/wallet';
import { RegisteredAlertTypeProvider } from '../providers/registered/alerttype/alerttype';
import { RegisteredUserProvider } from '../providers/registered/user/user';
import { UnregisteredCryptocurrencyProvider } from '../providers/unregistered/cryptocurrency/cryptocurrency';
import { UnregisteredUserProvider } from '../providers/unregistered/user/user';

@NgModule({
  declarations: [
    MyApp,
    CryptocurrenciesPage,
    FavoritesPage,
    WalletsPage,
    AlertsPage,
    SettingsPage,
    TabsPage,
    ChartPage,
    AuthenticationPage,
    OverviewWalletPage,
    InsertWalletPage,
    UpdateWalletPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    CryptocurrenciesPage,
    FavoritesPage,
    WalletsPage,
    AlertsPage,
    SettingsPage,
    TabsPage,
    ChartPage,
    AuthenticationPage,
    OverviewWalletPage,
    InsertWalletPage,
    UpdateWalletPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdministratorAlertProvider,
    AdministratorAlertTypeProvider,
    AdministratorAssetProvider,
    AdministratorCryptocurrencyProvider,
    AdministratorFavoriteProvider,
    AdministratorLogProvider,
    AdministratorSettingProvider,
    AdministratorTokenProvider,
    AdministratorUserProvider,
    AdministratorWalletProvider,
    RegisteredAlertTypeProvider,
    RegisteredUserProvider,
    UnregisteredCryptocurrencyProvider,
    UnregisteredUserProvider
  ]
})
export class AppModule {
}