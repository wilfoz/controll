import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingListModule } from '../../modules/building-list/building-list.module';
import { ActivityModule } from '../../modules/activities/activity.module';
import { LeaderModule } from '../../modules/leaders/leader.module';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BuildingListModule,
    ActivityModule,
    LeaderModule,
  ],
  providers: [
  ]
})
export class DefaultModule { }
