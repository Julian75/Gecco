import { SoporteSCService } from './../../../servicios/soporteSC.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { HistorialSolicitudesService } from './../../../servicios/historialSolicitudes.service';
import { SolicitudSCService } from './../../../servicios/solicitudSC.service';
import { SoporteSC } from './../../../modelos/soporteSC';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivo-solicitud',
  templateUrl: './subir-archivo-solicitud.component.html',
  styleUrls: ['./subir-archivo-solicitud.component.css']
})
export class SubirArchivoSolicitudComponent implements OnInit {
  public formArchivo!: FormGroup;

  //Lista de archivos seleccionados
  selectedFiles!: FileList;
  public listaArchivos: any = []
  public listaArchivos2: any = []

  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo: any = []

   //Mensaje que almacena la respuesta de las Apis
   public message: String = '';

   //Nombre del archivo para usarlo posteriormente en la vista html
  public fileName: String = "";
  // fileInfos!: Observable<any>;

  constructor(
    private http: HttpClient,
    private servicioSolicitudSc : SolicitudSCService,
    private servicioHistorial : HistorialSolicitudesService,
    private servicioUsuario : UsuarioService,
    private servicioSoporte : SoporteSCService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,

  ) { }

  ngOnInit(): void {
  }

  public w: any
  selectFiles(event): void {
    var w = event.target.files
    this.w = w
    this.listaArchivos = []
    this.listaArchivos.push(w)
    this.listaArchivos2 = []
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.listaArchivos.forEach(element => {
      for (let index = 0; index < element.length; index++) {
        const element1 = element[index];
        this.listaArchivos2.push(element1.name)
      }
    });
  }

  percentDone: number;
  uploadSuccess: boolean;
  uploadFiles(files: File[]){
    console.log(this.w)
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('files',f))
    this.http.post('http://10.192.110.105:8080/geccoapi-2.7.0/api/Pdf/guardar', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          window.location.reload();
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          window.location.reload();
        }
    });
  }

  idSolicitud: any;
  listHistorialId: any = []
  public guardar(){
    this.idSolicitud = this.data
    var contador = 0
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.listHistorialId = []
    this.servicioHistorial.listarTodos().subscribe(resHistorial=>{
      resHistorial.forEach(elementHistorial => {
        if(elementHistorial.idSolicitudSC.id == this.idSolicitud){
          this.listHistorialId.push(elementHistorial.id)
        }
      });
      const idHistorialMen = Math.min.apply(null, this.listHistorialId)
      this.servicioSolicitudSc.listarPorId(this.idSolicitud).subscribe(resSolicitud=>{
        this.servicioHistorial.listarPorId(idHistorialMen).subscribe(resHistorial=>{
          console.log(idHistorialMen)
          let soporte : SoporteSC = new SoporteSC();
          soporte.idSolicitudSC = resSolicitud
          soporte.idHistorial = resHistorial
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
            soporte.idUsuario = resUsuario
            this.listaArchivos2.forEach(element => {
              contador++
              soporte.descripcion = element
              this.registrarSoporte(soporte, contador);
            });
          })
        })
      })
    })
  }

  public registrarSoporte(soporte: SoporteSC, cont){
    this.servicioSoporte.registrar(soporte).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(cont)
      if(this.listaArchivos.length == cont){
        this.uploadFiles(this.w);
      }
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar el soporte!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
