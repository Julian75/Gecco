
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorRoutingModule } from './director-routing.module';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    DirectorRoutingModule
  ],
  exports:[
    UsuariosComponent
  ]
})
export class DirectorModule { }
