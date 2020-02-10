import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyScheduleComponent } from './weekly-schedule.component';


const routes: Routes = [
  { path: '', component: WeeklyScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklyRoutingModule { }