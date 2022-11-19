import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivoAutorizacionPago } from '../modelos/motivoAutorizacionPago';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class MotivoAutorizacionPagoService {

  private path = this.sharedService.APIUrl+'/MotivoAutorizacionPago';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<MotivoAutorizacionPago[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<MotivoAutorizacionPago>(this.path+'/ObtenerId/'+id);
  }

  public registrar(motivoAutorizacionPago: MotivoAutorizacionPago){
    return this.http.post<void>(this.path+'/Guardar',motivoAutorizacionPago);
  }

  public actualizar(motivoAutorizacionPago: MotivoAutorizacionPago){
    return this.http.put<void>(this.path+'/Modificar/'+ motivoAutorizacionPago.id, motivoAutorizacionPago);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
