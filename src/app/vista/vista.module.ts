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
import { UsuariosComponent } from './modulos-administracion/usuarios/usuarios.component';
import { ModuloComponent } from './modulos-administracion/modulo/modulo.component';
import { AgregarModuloComponent } from './modulos-administracion/modulo/agregar-modulo/agregar-modulo.component';
import { ModificarModuloComponent } from './modulos-administracion/modulo/modificar-modulo/modificar-modulo.component';
import { RolComponent } from './modulos-administracion/rol/rol.component';
import { AgregarRolComponent } from './modulos-administracion/rol/agregar-rol/agregar-rol.component';
import { ModificarRolComponent } from './modulos-administracion/rol/modificar-rol/modificar-rol.component';
import { TipoTurnoComponent } from './modulos-turnos/tipo-turno/tipo-turno.component';
import { AgregarTipoTurnoComponent } from './modulos-turnos/tipo-turno/agregar-tipo-turno/agregar-tipo-turno.component';
import { ModificarTipoTurnoComponent } from './modulos-turnos/tipo-turno/modificar-tipo-turno/modificar-tipo-turno.component';
import { TurnosComponent } from './modulos-turnos/turnos/turnos.component';
import { AgregarTurnosComponent } from './modulos-turnos/turnos/agregar-turnos/agregar-turnos.component';
import { ModificarTurnosComponent } from './modulos-turnos/turnos/modificar-turnos/modificar-turnos.component';
import { TipoDocumentoComponent } from './modulos-administracion/tipo-documento/tipo-documento.component';
import { AgregarTipoDocumentoComponent } from './modulos-administracion/tipo-documento/agregar-tipo-documento/agregar-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modulos-administracion/tipo-documento/modificar-tipo-documento/modificar-tipo-documento.component';
import { ListaEstadosComponent } from './modulos-administracion/modulo/lista-estados/lista-estados.component';
import { AgregarEstadoComponent } from './modulos-administracion/modulo/lista-estados/agregar-estado/agregar-estado.component';
import { ModificarEstadoComponent } from './modulos-administracion/modulo/lista-estados/modificar-estado/modificar-estado.component';
import { AgregarUsuariosComponent } from './modulos-administracion/usuarios/agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from './modulos-administracion/usuarios/modificar-usuarios/modificar-usuarios.component';
import { AccesosComponent } from './modulos-administracion/accesos/accesos.component';
import { AgregarAccesosComponent } from './modulos-administracion/accesos/agregar-accesos/agregar-accesos.component';
import { ModificarAccesosComponent } from './modulos-administracion/accesos/modificar-accesos/modificar-accesos.component';
import { HttpClientModule } from '@angular/common/http';
import { AsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/asignar-turno-vendedor.component';
import { AgregarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/agregar-asignar-turno-vendedor/agregar-asignar-turno-vendedor.component';
import { ModificarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/modificar-asignar-turno-vendedor/modificar-asignar-turno-vendedor.component';
import { AsignarTurnoComponent } from './modulos-turnos/asignar-turno/asignar-turno.component';
import { AgregarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/agregar-asignar-turno/agregar-asignar-turno.component';
import { ModificarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/modificar-asignar-turno/modificar-asignar-turno.component';
import { AsignarPuntoVentaComponent } from './modulos-turnos/asignar-punto-venta/asignar-punto-venta.component';
import { AgregarAsignarPuntoVentaComponent } from './modulos-turnos/asignar-punto-venta/agregar-asignar-punto-venta/agregar-asignar-punto-venta.component';
import { ModificarAsignarPuntoVentaComponent } from './modulos-turnos/asignar-punto-venta/modificar-asignar-punto-venta/modificar-asignar-punto-venta.component';

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
    ModificarTurnosComponent,
    TipoDocumentoComponent,
    AgregarTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    ListaEstadosComponent,
    AgregarEstadoComponent,
    ModificarEstadoComponent,
    AgregarUsuariosComponent,
    ModificarUsuariosComponent,
    AccesosComponent,
    AgregarAccesosComponent,
    ModificarAccesosComponent,
    AsignarTurnoVendedorComponent,
    AgregarAsignarTurnoVendedorComponent,
    ModificarAsignarTurnoVendedorComponent,
    AsignarTurnoComponent,
    AgregarAsignarTurnoComponent,
    ModificarAsignarTurnoComponent,
    AsignarPuntoVentaComponent,
    AgregarAsignarPuntoVentaComponent,
    ModificarAsignarPuntoVentaComponent,
  ],
  imports: [
    CommonModule,
    VistaRoutingModule,
    MaterialModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    DataTablesModule,
    RouterModule,
    HttpClientModule
  ],
})
export class VistaModule { }
