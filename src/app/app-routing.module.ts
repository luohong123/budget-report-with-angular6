import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BgrpTaskComponent } from 'src/app/components/task/task.compontent';
import { BgrpFormatComponent } from 'src/app/components/format/format.compontent';
import { FileTemplateComponent } from 'src/app/components/file-template/file-template.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FileGenerateSubtableComponent } from 'src/app/components/file-generate/file-generate-subtable.component';
import { FileGenerateComponent } from 'src/app/components/file-generate/file-generate.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'task', component: BgrpTaskComponent },
  { path: 'format', component: BgrpFormatComponent },
  { path: 'file-template', component: FileTemplateComponent },
  { path: 'file-generate', component: FileGenerateComponent },
  { path: 'catalog', component: CatalogComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
