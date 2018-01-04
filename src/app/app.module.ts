import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EntryPage } from '../pages/entry/entry';
import { PhpProvider } from '../providers/php/php';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EntryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhpProvider
  ]
})
export class AppModule {}
