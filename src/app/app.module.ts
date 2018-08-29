import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService, FccoreModule } from 'fccore2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './/app-routing.module';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { BgrpTaskComponent } from 'src/app/components/task/task.compontent';
import { BgrpFormatComponent } from 'src/app/components/format/format.compontent';
import {FccomponentModule} from 'fccomponent2';
import { RpListdataComponent } from 'src/app/components/common/rpListdata.compontent';
import { BgrpTaskService } from 'src/app/services/task.service';
import { BgrpFormatService } from 'src/app/services/format.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    BgrpTaskComponent,
    BgrpFormatComponent,
    RpListdataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    FccoreModule,
    FccomponentModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },
    BgrpTaskService,
    BgrpFormatService,
    NzModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public service: NzMessageService) {
    MessageService.sender = service;
  }
}
