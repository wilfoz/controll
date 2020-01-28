import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListNewComponent } from './list-new/list-new.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: ListNewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class BuildingListRoutingModule { }
