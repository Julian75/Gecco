import { ModulosComponent } from './componentes/modulos/modulos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: UsuariosComponent
  // },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'modulos',
    component: ModulosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule {
}
