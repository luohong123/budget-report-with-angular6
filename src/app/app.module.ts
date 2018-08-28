import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FccoreModule, MessageService } from 'fccore2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzMessageService } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './/app-routing.module';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    FccoreModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public service: NzMessageService) {
    MessageService.sender = service;
  }
}
