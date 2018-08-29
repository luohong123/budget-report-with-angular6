import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { BgrpTaskComponent } from 'src/app/components/task/task.compontent';
import { BgrpFormatComponent } from 'src/app/components/format/format.compontent';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'table', component: TableComponent },
  { path: 'task', component: BgrpTaskComponent },
  { path: 'format', component: BgrpFormatComponent }
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
