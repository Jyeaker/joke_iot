import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
export const firebaseConfig = {
  apiKey: "AIzaSyBzyX-oRPqH5T0G8lcZnCpJ3LZFZQXcstQ",
    authDomain: "test-e5236.firebaseapp.com",
    databaseURL: "https://test-e5236-default-rtdb.firebaseio.com",
    projectId: "test-e5236",
    storageBucket: "test-e5236.appspot.com",
    messagingSenderId: "33459708369",
    appId: "1:33459708369:web:c9c7d7ed1952a6c7ddc0f0",
    measurementId: "G-MWSDPC378K"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AngularFireDatabase],
  bootstrap: [AppComponent],
})
export class AppModule {}
