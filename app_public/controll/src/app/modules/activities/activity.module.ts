import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityFormComponent } from './shared/activity-form/activity-form.component';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityNewComponent,
    ActivityDetailComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule
  ], entryComponents: [
    ActivityDetailComponent
  ]
})
export class ActivityModule { }
