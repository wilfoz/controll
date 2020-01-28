import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { LeaderListComponent } from './leader-list/leader-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeaderDetailComponent } from './leader-detail/leader-detail.component';
import { LeaderNewComponent } from './leader-new/leader-new.component';
import { LeaderFormComponent } from './shared/leader-form/leader-form.component';

@NgModule({
  declarations: [LeaderListComponent, LeaderDetailComponent, LeaderNewComponent, LeaderFormComponent],
  imports: [
    CommonModule,
    LeaderRoutingModule,
    SharedModule
  ], entryComponents: [
    LeaderDetailComponent
]
})
export class LeaderModule { }
