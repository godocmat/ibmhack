import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, sk_SK } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import sk from '@angular/common/locales/sk';
import { UploadComponent } from './pages/upload/upload.component';
import { NzUploadModule, NzMessageModule } from 'ng-zorro-antd';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import { MapComponent } from './pages/map/map.component'

registerLocaleData(sk);

let firebaseConfig = {
  apiKey: 'AIzaSyDaDErFhXPwaxD2eawK8OWG-6fSCdffDys',
  authDomain: 'ftaciky-a27b6.firebaseapp.com',
  databaseURL: 'https://ftaciky-a27b6.firebaseio.com',
  projectId: 'ftaciky-a27b6',
  storageBucket: 'ftaciky-a27b6.appspot.com',
  messagingSenderId: '279753285207',
  appId: '1:279753285207:web:e4af9f604ee56d37040d12'
};

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzUploadModule,
    NzMessageModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [{ provide: NZ_I18N, useValue: sk_SK }],
  bootstrap: [AppComponent]
})
export class AppModule { }
