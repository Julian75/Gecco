import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CotizacionPdf } from '../modelos/cotizacionPdf';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionPdfService {

  private path = this.sharedService.APIUrl+'/CotizacionPdf';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<CotizacionPdf[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<CotizacionPdf>(this.path+'/ObtenerId/'+id);
  }

  public registrar(cotizacion: CotizacionPdf){
    return this.http.post<void>(this.path+'/Guardar',cotizacion);
  }

  public actualizar(cotizacion: CotizacionPdf){
    return this.http.put<void>(this.path+'/Modificar/'+ cotizacion.id,cotizacion);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
