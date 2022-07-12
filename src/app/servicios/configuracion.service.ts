import { Configuracion } from './../modelos/configuracion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
    providedIn: 'root'
  })
  export class ConfiguracionService {

    private path = this.sharedService.APIUrl+'/Configuracion';

    constructor(private http:HttpClient,
      private sharedService:SharedService
       )
     { }

    public listarTodos(){
      return this.http.get<Configuracion[]>(this.path+'/Obtener');
    }

   public listarPorId(id: number){
      return this.http.get<Configuracion>(this.path+'/ObtenerId/'+id);
    }

    public registrar(configuracion: Configuracion){
      return this.http.post<void>(this.path+'/Guardar',configuracion);
    }

    public actualizar(configuracion: Configuracion){
      return this.http.put<void>(this.path+'/Modificar/'+ configuracion.id,configuracion);
    }

    public eliminar(id: number){
      return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }
  }
