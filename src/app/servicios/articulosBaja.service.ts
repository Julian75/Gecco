import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticulosBaja} from '../modelos/articulosBaja';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosBajaService {

  private path = this.sharedService.APIUrl+'/ArticulosBaja';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get<ArticulosBaja[]>(this.path+'/Obtener');
  }

 public listarPorId(id: number){
    return this.http.get<ArticulosBaja>(this.path+'/ObtenerId/'+id);
  }

  public registrar(articulosBaja: ArticulosBaja){
    return this.http.post<void>(this.path+'/Guardar',articulosBaja);
  }

  public actualizar(articulosBaja: ArticulosBaja){
    return this.http.put<void>(this.path+'/Modificar/'+ articulosBaja.id, articulosBaja);
  }

  public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
  }
}
