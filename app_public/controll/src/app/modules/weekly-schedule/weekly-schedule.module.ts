import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { WeeklyRoutingModule } from './weekly-schedule-routing.module';
import { WeeklyScheduleComponent } from './weekly-schedule.component';

@NgModule({
  declarations: [
    WeeklyScheduleComponent
  ],
  imports: [
    CommonModule,
    WeeklyRoutingModule,
    SharedModule
  ]
})
export class WeeklyModule { }