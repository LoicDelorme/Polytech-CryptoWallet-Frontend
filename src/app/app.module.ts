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

import { CryptocurrencyProvider } from '../providers/cryptocurrency/cryptocurrency';
import { UserProvider } from '../providers/user/user';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { WalletProvider } from '../providers/wallet/wallet';
import { AlertProvider } from '../providers/alert/alert';
import { SettingProvider } from '../providers/setting/setting';
import { TokenProvider } from '../providers/token/token';
import { LogProvider } from '../providers/log/log';

@NgModule({
  declarations: [
    MyApp,
    CryptocurrenciesPage,
    FavoritesPage,
    WalletsPage,
    AlertsPage,
    SettingsPage,
    TabsPage
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CryptocurrencyProvider,
    UserProvider,
    FavoriteProvider,
    WalletProvider,
    AlertProvider,
    SettingProvider,
    TokenProvider,
    LogProvider
  ]
})
export class AppModule {
}