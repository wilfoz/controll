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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule,
    ChartsModule
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule,
    FooterComponent,
    SidebarComponent,
    PieComponent,
    MaterialModule
  ]
})
export class SharedModule { }
