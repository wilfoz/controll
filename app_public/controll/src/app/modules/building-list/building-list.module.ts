import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingListRoutingModule } from './building-list-routing';
import { ListComponent } from './list/list.component';
import { ListNewComponent } from './list-new/list-new.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ListFormsComponent } from './shared/list-forms/list-forms.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    ListNewComponent,
    ListDetailComponent,
    ListFormsComponent
  ],
  imports: [
    CommonModule,
    BuildingListRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ListDetailComponent
]
})
export class BuildingListModule { }
