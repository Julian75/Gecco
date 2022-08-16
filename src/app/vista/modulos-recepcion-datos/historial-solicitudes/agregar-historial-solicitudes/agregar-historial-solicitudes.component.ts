import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';
import Swal from 'sweetalert2';
import { HistorialSolicitudes } from 'src/app/modelos/historialSolicitudes';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { HistorialSolicitudesService } from 'src/app/servicios/historialSolicitudes.service';
import { SolicitudSC } from 'src/app/modelos/solicitudSC';
import { SoporteSC } from 'src/app/modelos/soporteSC';
import { SoporteSCService } from 'src/app/servicios/soporteSC.service';

@Component({
  selector: 'app-agregar-historial-solicitudes',
  templateUrl: './agregar-historial-solicitudes.component.html',
  styleUrls: ['./agregar-historial-solicitudes.component.css']
})
export class AgregarHistorialSolicitudesComponent implements OnInit {

  public formComentario!: FormGroup;
  public opcion: number = 0;
  public listarUsuarios: any = [];
  usuarios = new FormControl('');

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
  fileInfos!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private servicioSubirPdf : SubirPdfService,
    private servicioSolicitudSc : SolicitudSCService,
    private servicioEstado : EstadoService,
    private servicioUsuario : UsuarioService,
    private servicioHistorial : HistorialSolicitudesService,
    private servicioSoporte : SoporteSCService,
    private servicioAsignacionPqrs : AsignarUsuariosPqrService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarAsignacionUsuario();
  }

  private crearFormulario() {
    this.formComentario = this.fb.group({
      id: 0,
      comentario: [null,Validators.required]
    });
  }

  public listarAsignacionUsuario(){
    this.servicioAsignacionPqrs.listarTodos().subscribe(res=>{
      this.listarUsuarios = res
    })
  }

  aprobar:boolean = false
  public capturarOpcion(opcion: number){
    this.opcion = opcion
    this.aprobar = false
    if(this.opcion == 1){
      this.aprobar = true
    }else if(this.opcion == 2){
      this.aprobar = false
    }
  }

  selectFiles(event: any) {
    this.listaArchivos2 = []
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
    this.listaArchivos = event.target.files
    for (let index = 0; index < this.listaArchivos.length; index++) {
      const element = this.listaArchivos[index];
      this.listaArchivos2.push(element.name)
    }
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(index:any, file: any) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.servicioSubirPdf.subirArchivo(file).subscribe((event:any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileInfos = this.servicioSubirPdf.listarTodos();
      }
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      window.location.reload();
    },
    err => {
      this.progressInfo[index].value = 0;
      this.message = 'No se puede subir el archivo ' + file.name;
    });
  }

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var comentario = this.formComentario.controls['comentario'].value;
    if(comentario == "" || comentario == null){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      let historial : HistorialSolicitudes = new HistorialSolicitudes();
      historial.observacion = comentario
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        historial.idSolicitudSC = resSolicitud
        this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
          historial.idEstado = resEstado
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
            historial.idUsuario = resUsuario
            if(this.usuarios.value.length >= 1){
              this.registrarHistorial(historial)
              for (let i = 0; i < this.usuarios.value.length; i++) {
                const element:any = this.usuarios.value[i];
                historial.observacion = ""
                historial.idSolicitudSC = resSolicitud
                this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
                  historial.idEstado = resEstado
                  this.servicioUsuario.listarPorId(element.idUsuario.id).subscribe(resUsuarios=>{
                    historial.idUsuario = resUsuarios
                    this.registrarHistorial2(historial);
                  })
                })
              }
            }else{
              this.registrarHistorial3(historial);
            }
          })
        })
      })
    }
  }

  public registrarHistorial(historial: HistorialSolicitudes){
    this.servicioHistorial.registrar(historial).subscribe(res=>{
      let solicitudSc : SolicitudSC = new SolicitudSC();
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
        solicitudSc.fecha = resSolicitud.fecha
        solicitudSc.id = resSolicitud.id
        solicitudSc.idEscala = resSolicitud.idEscala
        solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud
        solicitudSc.idTipoServicio = resSolicitud.idTipoServicio
        solicitudSc.incidente = resSolicitud.incidente
        solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
        solicitudSc.municipio = resSolicitud.municipio
        solicitudSc.vence = resSolicitud.vence
        this.servicioEstado.listarPorId(63).subscribe(resEstado=>{
          solicitudSc.idEstado = resEstado
          this.modificarSolicitudSc(solicitudSc);
        })
      })
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar el comentario para el Historial!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public registrarHistorial2(historial: HistorialSolicitudes){
    this.servicioHistorial.registrar(historial).subscribe(res=>{

    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar el comentario para el Historial del Adjuntado!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public modificarSolicitudSc(solicitudSc: SolicitudSC){
    this.servicioSolicitudSc.actualizar(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        let soporte : SoporteSC = new SoporteSC();
        soporte.idSolicitudSC = solicitudSc
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
          soporte.idUsuario = resUsuario
          this.listaArchivos2.forEach(element => {
            soporte.descripcion = element
            this.registrarSoporte(soporte);
          });
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comentario Generado!',
          showConfirmButton: false,
          timer: 1500
        })
        // this.router.navigate(['/solicitudesSC']);
      }
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public registrarSoporte(soporte: SoporteSC){
    this.servicioSoporte.registrar(soporte).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.uploadFiles();
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

  public registrarHistorial3(historial: HistorialSolicitudes){
    this.servicioHistorial.registrar(historial).subscribe(res=>{
      let solicitudSc : SolicitudSC = new SolicitudSC();
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
        solicitudSc.fecha = resSolicitud.fecha
        solicitudSc.id = resSolicitud.id
        solicitudSc.idEscala = resSolicitud.idEscala
        solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud
        solicitudSc.idTipoServicio = resSolicitud.idTipoServicio
        solicitudSc.incidente = resSolicitud.incidente
        solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
        solicitudSc.municipio = resSolicitud.municipio
        solicitudSc.vence = resSolicitud.vence
        this.servicioEstado.listarPorId(67).subscribe(resEstado=>{
          solicitudSc.idEstado = resEstado
          this.modificarSolicitudSc2(solicitudSc);
        })
      })
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar el comentario para el Historial!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public modificarSolicitudSc2(solicitudSc: SolicitudSC){
    this.servicioSolicitudSc.actualizar(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        let soporte : SoporteSC = new SoporteSC();
        soporte.idSolicitudSC = solicitudSc
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
          soporte.idUsuario = resUsuario
          this.listaArchivos2.forEach(element => {
            soporte.descripcion = element
            this.registrarSoporte(soporte);
          });
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comentario Generado!',
          showConfirmButton: false,
          timer: 1500
        })
        // this.router.navigate(['/solicitudesSC']);
      }
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

}
