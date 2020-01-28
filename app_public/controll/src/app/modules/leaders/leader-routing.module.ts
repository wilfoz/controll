import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderListComponent } from './leader-list/leader-list.component';
import { LeaderNewComponent } from './leader-new/leader-new.component';

const routes: Routes = [
  { path: '', component: LeaderListComponent },
  { path: 'create', component: LeaderNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
