import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionsListComponent } from './productions-list/productions-list.component';
import { ProductionsNewComponent } from './productions-new/productions-new.component';
import { ProductionsDetailComponent } from './productions-detail/productions-detail.component';
import { ProductionFormComponent } from './shared/production-form/production-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductionsListComponent,
    ProductionsNewComponent,
    ProductionsDetailComponent,
    ProductionFormComponent
  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SharedModule
  ], entryComponents: [
    ProductionsDetailComponent
  ]
})
export class ProductionModule { }
