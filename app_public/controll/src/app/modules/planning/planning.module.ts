import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PlanningRoutingModule } from './planning-routing.module';
import { ProductionMonitoringResolver } from './production-monitoring/guards/production-monitoring.resolver';
import { PdsComponent } from './pds/pds.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { ProductionMonitoringComponent } from './production-monitoring/production-monitoring.component';
import { CivilComponent } from './production-monitoring/shared/svg/civil/civil.component';
import { AssemblyComponent } from './production-monitoring/shared/svg/assembly/assembly.component';
import { EmbargoesComponent } from './production-monitoring/shared/svg/embargoes/embargoes.component';
import { InfoDetailComponent } from './production-monitoring/shared/modal/info/app-info-detail.component';

@NgModule({
  declarations: [
    PdsComponent,
    WeeklyComponent,
    ProductionMonitoringComponent,
    CivilComponent,
    AssemblyComponent,
    EmbargoesComponent,
    InfoDetailComponent
  ],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    SharedModule
  ], entryComponents: [
    InfoDetailComponent
  ]
})
export class PlanningModule { }