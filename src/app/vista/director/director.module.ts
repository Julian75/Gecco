
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorRoutingModule } from './director-routing.module';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';
import {DataTablesModule} from 'angular-datatables';
import { ModulosComponent } from './componentes/modulos/modulos.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsuariosComponent,
    ModulosComponent,
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    MaterialModule,
    DataTablesModule,
    RouterModule,
  ],
  exports:[
    UsuariosComponent
  ],
})
export class DirectorModule { }
