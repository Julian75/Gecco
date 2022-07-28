import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaspasDTO } from 'src/app/modelos/modelosSiga/raspasDTO';
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

  public listarTodos(fecha:string){
    return this.http.get<RaspasDTO[]>(this.path+'/Obtener?fecActual='+fecha);
  }

  public listarPorId(fecha:string, id: string){
    return this.http.get<RaspasDTO[]>(this.path+'/Obtener?fecActual='+fecha+'&raspa='+id);
  }
}
