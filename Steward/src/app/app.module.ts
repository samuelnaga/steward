import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

///// PROVIDERS
import { UserProvider } from '../providers/user/user';
import { CountryProvider } from '../providers/country/country';
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
    CityPage
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
    CityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CountryProvider
  ]
})
export class AppModule {}
