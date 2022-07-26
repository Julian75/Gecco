import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RaspasDTOService {

  private path = this.sharedService.APIUrlSiga+'/RaspasSiga';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarPorId(fecha:string, id: string){
    return this.http.get<SitioVenta[]>(this.path+'/Obtener?fecActual='+fecha+'&raspa='+id);
  }
}
