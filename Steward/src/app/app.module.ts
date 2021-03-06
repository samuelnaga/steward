import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
/////PLUGINS
//import { QRScanner } from '@ionic-native/qr-scanner';
import { BackgroundMode } from '@ionic-native/background-mode'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/////

///// PROVIDERS
import { UserProvider } from '../providers/user/user';
import { CountryProvider } from '../providers/country/country';
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { BackgroundModeProvider } from '../providers/background-mode/background-mode';
import { GlobalProvider } from '../providers/global/global';
import { CityProvider } from '../providers/city/city';
/////

import { MyApp } from './app.component';

///// PAGES
import { LoginPage } from '../pages/login/login';
  //User
import { UserListPage } from '../pages/user/user-list/user-list';
import { UserViewPage } from '../pages/user/user-view/user-view';
import { UserProfilePage } from '../pages/user/user-profile/user-profile';
  //
  //Admin
import { CountriesPage } from '../pages/admin/countries/countries';
import { CountryPage } from '../pages/admin/country/country';
import { CityPage } from '../pages/admin/city/city';
import { BuildingPage } from '../pages/admin/building/building';
import { FloorPage } from '../pages/admin/floor/floor';
  //Creation Modals
import { CountryModalPage } from '../pages/creationModals/country-modal/country-modal';
import { BuildingProvider } from '../providers/building/building';
import { FloorProvider } from '../providers/floor/floor';
import { WorkplaceProvider } from '../providers/workplace/workplace';
  //
/////



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserListPage,
    UserViewPage,
    UserProfilePage,
    CountriesPage,
    CountryPage,
    CityPage,
    BuildingPage,
    FloorPage,
    CountryModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserListPage,
    UserViewPage,
    UserProfilePage,
    CountriesPage,
    CountryPage,
    CityPage,
    BuildingPage,
    FloorPage,
    CountryModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CountryProvider,
    ToastServiceProvider,
    BackgroundModeProvider,
    CityProvider,
    GlobalProvider,
    BuildingProvider,
    FloorProvider,
    WorkplaceProvider
  ]
})
export class AppModule {}
