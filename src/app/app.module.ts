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
import { NzUploadModule, NzMessageModule } from 'ng-zorro-antd'

registerLocaleData(sk);

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzUploadModule,
    NzMessageModule
  ],
  providers: [{ provide: NZ_I18N, useValue: sk_SK }],
  bootstrap: [AppComponent]
})
export class AppModule { }
