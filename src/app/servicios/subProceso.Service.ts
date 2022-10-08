import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubProceso } from '../modelos/subProceso';
import { SharedService } from '../shared.service';
@Injectable({
    providedIn: 'root'
  })
    export class SubProcesoService {

        private path = this.sharedService.APIUrl+'/SubProceso';

        constructor(private http:HttpClient,
            private sharedService:SharedService
            )
            { }

        public listarTodos(){
            return this.http.get<SubProceso[]>(this.path+'/Obtener');
        }

        public listarPorId(id: number){
            return this.http.get<SubProceso>(this.path+'/ObtenerId/'+id);
        }

        public registrar(subProceso: SubProceso){
            return this.http.post<void>(this.path+'/Guardar',subProceso);
        }

        public actualizar(subProceso: SubProceso){
            return this.http.put<void>(this.path+'/Modificar/'+ subProceso.id,subProceso);
        }

        public eliminar(id: number){
            return this.http.delete<void>(this.path+'/Eliminar/'+id);
        }
    }
