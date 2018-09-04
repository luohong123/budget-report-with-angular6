import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService, FccoreModule } from 'fccore2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BgrpTaskComponent } from 'src/app/components/task/task.compontent';
import { BgrpFormatComponent } from 'src/app/components/format/format.compontent';
import {FccomponentModule} from 'fccomponent2';
import { RpListdataComponent } from 'src/app/components/common/rp-listdata.compontent';
import { BgrpTaskService } from 'src/app/services/task.service';
import { BgrpFormatService } from 'src/app/services/format.service';
import { TaskModalComponent } from 'src/app/components/task/task_modal.compontent';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';
import { FormatModalComponent } from 'src/app/components/format/format-modal/format-modal.component';
import { FormatAddModalComponent } from './components/format/format-modal/format-modal-add.component';
import { FileTemplateComponent } from 'src/app/components/file-template/file-template.component';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
import { FileTemplateAddModalComponent } from 'src/app/components/file-template/file-template-modal/file-template-modal-add.component';
import { FileTemplateEditModalComponent } from 'src/app/components/file-template/file-template-modal/file-template-modal-edit.component';
import { FormatEditModalComponent } from './components/format/format-modal/format-modal-eidt.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CatalogAddComponent } from './components/catalog/catalog-add.compoent';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogService } from 'src/app/services/catalog.services';
import { ListDataFilter } from 'src/app/pipe/report.pipe';

registerLocaleData(zh);

@NgModule({
  entryComponents: [
    TaskModalComponent,
    FormatModalComponent,
    FormatAddModalComponent,
    FileTemplateAddModalComponent,
    FileTemplateEditModalComponent,
    FormatEditModalComponent,
    CatalogAddComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BgrpTaskComponent,
    BgrpFormatComponent,
    FileTemplateComponent,
    RpListdataComponent,
    TaskModalComponent,
    FormatModalComponent,
    FormatAddModalComponent,
    FileTemplateAddModalComponent,
    FileTemplateEditModalComponent,
    FormatEditModalComponent,
    CatalogComponent,
    CatalogAddComponent,
    ListDataFilter
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
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    BgrpTaskService,
    BgrpFormatService,
    CatalogService,
    NzModalService,
    BgrpFileTemplateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public service: NzMessageService) {
    MessageService.sender = service;
  }
}
