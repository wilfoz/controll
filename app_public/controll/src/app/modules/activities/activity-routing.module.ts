import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';

const routes: Routes = [
  { path: '', component: ActivitiesListComponent },
  { path: 'create', component: ActivityNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
