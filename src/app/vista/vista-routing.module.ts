import { ModificarRolComponent } from './modulos/rol/modificar-rol/modificar-rol.component';
import { AgregarRolComponent } from './modulos/rol/agregar-rol/agregar-rol.component';
import { RolComponent } from './modulos/rol/rol.component';
import { ModificarModuloComponent } from './modulos/modulo/modificar-modulo/modificar-modulo.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes-principales/sidebar/sidebar.component';
import { InicioGeneralComponent } from './componentes-principales/inicio-general/inicio-general.component';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { AgregarModuloComponent } from './modulos/modulo/agregar-modulo/agregar-modulo.component';
import { TipoTurnoComponent } from './modulos/tipo-turno/tipo-turno.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'inicio',
        component: InicioGeneralComponent
      },
      // Apartado de modulos
      {
        path: 'modulo',
        component: ModuloComponent
      },
      {
        path: 'modificarModulo/:id',
        component: ModificarModuloComponent
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
