import { ModificarRolComponent } from './modulos/rol/modificar-rol/modificar-rol.component';
import { RolComponent } from './modulos/rol/rol.component';
import { ModificarModuloComponent } from './modulos/modulo/modificar-modulo/modificar-modulo.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes-principales/sidebar/sidebar.component';
import { InicioGeneralComponent } from './componentes-principales/inicio-general/inicio-general.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { TipoTurnoComponent } from './modulos/tipo-turno/tipo-turno.component';
import { TurnosComponent } from './modulos/turnos/turnos.component';
import { AgregarTurnosComponent } from './modulos/turnos/agregar-turnos/agregar-turnos.component';
import { ModificarTurnosComponent } from './modulos/turnos/modificar-turnos/modificar-turnos.component';
import { TipoDocumentoComponent } from './modulos/tipo-documento/tipo-documento.component';
import { ListaEstadosComponent } from './modulos/modulo/lista-estados/lista-estados.component';
import { AgregarUsuariosComponent } from './modulos/usuarios/agregar-usuarios/agregar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'inicio',
        component: InicioGeneralComponent
      },
      // Apartado de modulos
      {
        path: 'modulo',
        component: ModuloComponent
      },
      // #Apartado Rol
      {
        path: 'roles',
        component: RolComponent
      },
      {
        path: 'modificarRol/:id',
        component: ModificarRolComponent
      },
      // Apartado de tipo turnos
      {
        path: 'tipoTurnos',
        component: TipoTurnoComponent
      },
      // Apartado de turnos
      {
        path: 'turnos',
        component: TurnosComponent
      },
      {
        path: 'agregarTurno',
        component: AgregarTurnosComponent
      },
      {
        path: 'modificarTurno/:id',
        component: ModificarTurnosComponent
      },
      // Apartado Tipo Documento
      {
        path: 'tipoDocumento',
        component: TipoDocumentoComponent
      },
      // Apartado visualizar Estados por modulo
      {
        path: 'visualizarEstados/:id',
        component: ListaEstadosComponent
      },
      // Apartado usuarios
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'agregarUsuario',
        component: AgregarUsuariosComponent
      },


    ]
  },
  // {
  //   path: 'usuarios',
  //   component: UsuariosComponent
  // },
  // {
  //   path: 'inicio',
  //   component: InicioGeneralComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VistaRoutingModule {
}
