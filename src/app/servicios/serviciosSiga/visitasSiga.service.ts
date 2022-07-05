import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';

@Injectable({
  providedIn: 'root'
})
export class VisitasSigaService {

  private path = this.sharedService.APIUrlSiga+'/VisitasSiga';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<VisitasSiga[]>(this.path+'/Obtener');
  }

  public listarPorId(fecha: string, id: string){
    return this.http.get<VisitasSiga[]>(this.path+"/Obtener?fec='"+fecha+"'&id='"+id+"'");
  }
}
