import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VentasAsesor } from 'src/app/modelos/modelosSiga/ventasAsesor';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class VentasAsesorService {

  private path = this.sharedService.APIUrlSiga+'/VentasAsesor';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarPorId(fechaInicial: string, fechaFinal: string, idVendedor: number){
    return this.http.get<VentasAsesor[]>(this.path+'/Obtener?fechaI='+fechaInicial+'&fechaF='+fechaFinal+'&ideVendedor='+idVendedor);
  }
}
