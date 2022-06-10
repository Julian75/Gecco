import { TalentoHumanoComponent } from './talento-humano/talento-humano.component';
import { LiderComercialComponent } from './lider-comercial/lider-comercial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';

const routes: Routes = [
  {
    path: 'director',
    component: DirectorComponent,
    loadChildren:()=>import('./director/director.module').then(mod=>mod.DirectorModule)
  },
  {
    path: 'liderComercial',
    component: LiderComercialComponent,
    loadChildren:()=>import('./lider-comercial/lider-comercial.module').then(mod=>mod.LiderComercialModule)
  },
  {
    path: 'talentoHumano',
    component: TalentoHumanoComponent,
    loadChildren:()=>import('./talento-humano/talento-humano.module').then(mod=>mod.TalentoHumanoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VistaRoutingModule {
}
