import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './componentes-principales/sidebar/sidebar.component';
import { NavbarComponent } from './componentes-principales/navbar/navbar.component';
import { VistaComponent } from './vista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaRoutingModule } from './vista-routing.module';
import { MaterialModule } from '../material/material.module';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { InicioGeneralComponent } from './componentes-principales/inicio-general/inicio-general.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { AgregarModuloComponent } from './modulos/modulo/agregar-modulo/agregar-modulo.component';
import { ModificarModuloComponent } from './modulos/modulo/modificar-modulo/modificar-modulo.component';
import { RolComponent } from './modulos/rol/rol.component';
import { AgregarRolComponent } from './modulos/rol/agregar-rol/agregar-rol.component';
import { ModificarRolComponent } from './modulos/rol/modificar-rol/modificar-rol.component';
import { TipoTurnoComponent } from './modulos/tipo-turno/tipo-turno.component';
import { AgregarTipoTurnoComponent } from './modulos/tipo-turno/agregar-tipo-turno/agregar-tipo-turno.component';
import { ModificarTipoTurnoComponent } from './modulos/tipo-turno/modificar-tipo-turno/modificar-tipo-turno.component';
import { TurnosComponent } from './modulos/turnos/turnos.component';
import { AgregarTurnosComponent } from './modulos/turnos/agregar-turnos/agregar-turnos.component';
import { ModificarTurnosComponent } from './modulos/turnos/modificar-turnos/modificar-turnos.component';

@NgModule({
  declarations: [
    VistaComponent,
    InicioGeneralComponent,
    NavbarComponent,
    SidebarComponent,
    UsuariosComponent,
    ModuloComponent,
    AgregarModuloComponent,
    ModificarModuloComponent,
    RolComponent,
    AgregarRolComponent,
    ModificarRolComponent,
    TipoTurnoComponent,
    AgregarTipoTurnoComponent,
    ModificarTipoTurnoComponent,
    TurnosComponent,
    AgregarTurnosComponent,
    ModificarTurnosComponent
  ],
  imports: [
    CommonModule,
    VistaRoutingModule,
    MaterialModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DataTablesModule,
    RouterModule,
  ],
})
export class VistaModule { }
