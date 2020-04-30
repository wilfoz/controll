import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionsListComponent } from './productions-list/productions-list.component';
import { ProductionsNewComponent } from './productions-new/productions-new.component';

const routes: Routes = [
  { path: '', component: ProductionsListComponent },
  { path: 'create', component: ProductionsNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
