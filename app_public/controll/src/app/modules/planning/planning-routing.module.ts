import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdsComponent } from './pds/pds.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { ProductionMonitoringComponent } from './production-monitoring/production-monitoring.component';
import { ProductionMonitoringResolver } from './production-monitoring/guards/production-monitoring.resolver';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./productions/production.module').then(mod => mod.ProductionModule)
    }, {
        path: 'pds', component: PdsComponent
    }, {
        path: 'week', component: WeeklyComponent
    }, {
        path: 'monitoring', component: ProductionMonitoringComponent, resolve: { prod: ProductionMonitoringResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ ProductionMonitoringResolver ]
})
export class PlanningRoutingModule { }
