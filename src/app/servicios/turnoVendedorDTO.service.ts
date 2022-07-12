import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { TurnoVendedorDTO } from '../modelos/turnoVendedorDTO';

@Injectable({
  providedIn: 'root'
})
export class TurnoVendedorDTOSevice {

  private path = this.sharedService.APIUrl+'/TurnoVendedorDTO';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

   public listarPorId(id: number){
    return this.http.get<TurnoVendedorDTO[]>(this.path+"/Obtener?idVendedor="+id);
  }
}
