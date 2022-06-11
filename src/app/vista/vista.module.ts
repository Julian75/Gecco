import { DirectorModule } from './director/director.module';
import { VistaComponent } from './vista.component';
import { TalentoHumanoComponent } from './talento-humano/talento-humano.component';
import { DirectorComponent } from './director/director.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiderComercialComponent } from './lider-comercial/lider-comercial.component';
import { VistaRoutingModule } from './vista-routing.module';
import { MaterialModule } from '../material/material.module';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../principal Estilos/sidebar/sidebar.component';

@NgModule({
  declarations: [
    VistaComponent,
    DirectorComponent,
    LiderComercialComponent,
    TalentoHumanoComponent
  ],
  imports: [
    CommonModule,
    VistaRoutingModule,
    MaterialModule,
    DataTablesModule,
    RouterModule,
  ],
  exports: [
    DataTablesModule,
    RouterModule,
  ],
})
export class VistaModule { }
