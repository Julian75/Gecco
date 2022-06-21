import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historial } from 'src/app/modelos/modelosSiga/historial';
import { SharedService } from 'src/app/shared.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private path = this.sharedService.APIUrlSiga+'/Historial';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<Historial[]>(this.path+'/Obtener');
  }

  public listarPorId(fecha: string, id: number){
    return this.http.get<Historial[]>(this.path+"/Obtener?fec='"+fecha+"'&id="+id);
  }
}
