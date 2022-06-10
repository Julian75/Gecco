import { VistaComponent } from './vista.component';
import { TalentoHumanoComponent } from './talento-humano/talento-humano.component';
import { DirectorComponent } from './director/director.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiderComercialComponent } from './lider-comercial/lider-comercial.component';
import { VistaRoutingModule } from './vista-routing.module';
import { MaterialModule } from '../material/material.module';

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
    MaterialModule
  ]
})
export class VistaModule { }
