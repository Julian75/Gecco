import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosFormularioPago } from '../modelos/datosFormularioPago';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class DatosFormularioPagoService {

  private path = this.sharedService.APIUrl+'/DatosFormularioPago';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<DatosFormularioPago[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<DatosFormularioPago>(this.path+'/ObtenerId/'+id);
  }

  public registrar(datosFormularioPago: DatosFormularioPago){
    return this.http.post<void>(this.path+'/Guardar',datosFormularioPago);
  }

  public actualizar(datosFormularioPago: DatosFormularioPago){
    return this.http.put<void>(this.path+'/Modificar/'+ datosFormularioPago.id, datosFormularioPago);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
