import { RouterModule } from '@angular/router';
import { VistaModule } from './vista/vista.module';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import {DataTablesModule} from 'angular-datatables';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarDatosComponent } from './formularios/formulariosPrincipales/modificar-datos/modificar-datos.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OlvidoContrasenaComponent,
    CambiarContrasenaComponent,
    ModificarDatosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    DataTablesModule,
    RouterModule,
    VistaModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DataTablesModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
