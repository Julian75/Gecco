import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class SubirPdfService {

  private path = this.sharedService.APIUrl+'/Pdf';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarTodos(){
    return this.http.get(`${this.path}/files`);
  }

  public listarPorId(nombreArchivo: String){
    return this.http.get(this.path+'/files/'+nombreArchivo);
  }

  public subirArchivo(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const  req = new HttpRequest('POST', `${this.path}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public eliminarFile(filename: string){
    return this.http.get(`${this.path}/delete/${filename}`);
  }

  //---------------------Segunda Carpeta---------------------------------------

  public listarTodosSegunda(){
    return this.http.get(`${this.path}/listar`);
  }

  public listarPorIdSegunda(nombreArchivo: String){
    return this.http.get(this.path+'/listarUno/'+nombreArchivo);
  }
  public subirArchivoSegunda(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    console.log(formData)
    const  req = new HttpRequest('POST', `${this.path}/guardar`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public eliminarFileSegunda(filename: string){
    return this.http.get(`${this.path}/eliminar/${filename}`);
  }

  //---------------------Tercera Carpeta---------------------------------------

  public listarTodasImagenes(){
    return this.http.get(`${this.path}/listarImagenes`);
  }

  public listarUnaImagen(nombreArchivo: String){
    return this.http.get(this.path+'/listarImagen/'+nombreArchivo);
  }
  public subirImagen(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    console.log(formData)
    const  req = new HttpRequest('POST', `${this.path}/subirImagen`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public eliminarImagen(filename: string){
    return this.http.get(`${this.path}/eliminarImagen/${filename}`);
  }

  //---------------------Cuarta Carpeta---------------------------------------

  public listarTodasFirmas(){
    return this.http.get(`${this.path}/listarFirmas`);
  }

  public listarUnaFirma(nombreArchivo: String){
    return this.http.get(this.path+'/listarFirma/'+nombreArchivo);
  }
  public subirFirma(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    console.log(formData)
    const  req = new HttpRequest('POST', `${this.path}/subirFirma`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public eliminarFirma(filename: string){
    return this.http.get(`${this.path}/eliminarFirma/${filename}`);
  }
}
