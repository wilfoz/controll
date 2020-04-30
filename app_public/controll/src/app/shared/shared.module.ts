import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PieComponent } from './widgets/pie/pie.component';
import { MaterialModule } from './material.module';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { FilereaderComponent } from './filereader/filereader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MenuListItemComponent,
    PieComponent,
    FilereaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    ChartsModule,
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule,
    FooterComponent,
    SidebarComponent,
    PieComponent,
    MaterialModule,
    FilereaderComponent
  ]
})
export class SharedModule { }
