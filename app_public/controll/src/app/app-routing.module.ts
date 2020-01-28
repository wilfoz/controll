import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'building-list',
    loadChildren: () => import('./modules/building-list/building-list.module').then(mod => mod.BuildingListModule)
  }, {
    path: 'activities-list',
    loadChildren: () => import('./modules/activities/activity.module').then(mod => mod.ActivityModule)
  }, {
    path: 'leaders-list',
    loadChildren: () => import('./modules/leaders/leader.module').then(mod => mod.LeaderModule)
  }, {
    path: 'productions-list',
    loadChildren: () => import('./modules/productions/production.module').then(mod => mod.ProductionModule)
  }, {
    path: 'pds',
    loadChildren: () => import('./modules/pds/pds.module').then(mod => mod.PdsModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
