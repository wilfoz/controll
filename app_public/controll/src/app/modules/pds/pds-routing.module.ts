import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdsComponent } from './pds.component';


const routes: Routes = [
  { path: '', component: PdsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdsRoutingModule { }