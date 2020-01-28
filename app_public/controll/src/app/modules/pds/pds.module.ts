import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PdsComponent } from './pds.component';
import { PdsRoutingModule } from './pds-routing.module';

@NgModule({
  declarations: [
    PdsComponent
  ],
  imports: [
    CommonModule,
    PdsRoutingModule,
    SharedModule
  ]
})
export class PdsModule { }