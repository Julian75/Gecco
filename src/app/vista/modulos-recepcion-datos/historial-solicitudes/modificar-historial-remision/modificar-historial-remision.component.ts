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
  selector: 'app-modificar-historial-remision',
  templateUrl: './modificar-historial-remision.component.html',
  styleUrls: ['./modificar-historial-remision.component.css']
})
export class ModificarHistorialRemisionComponent implements OnInit {

  public formComentario!: FormGroup;
  public opcion: number = 0;
  public listarUsuarios: any = [];
  public listarHistorial: any = [];
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
      comentario: [null,Validators.required],
      opcion: [null,Validators.required]
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
    var opcion = this.formComentario.controls['opcion'].value;
    if(comentario == "" || comentario == null || opcion == null){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos o la seleccion no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      let historial : HistorialSolicitudes = new HistorialSolicitudes();
      historial.observacion = comentario
      this.servicioHistorial.listarTodos().subscribe(resSolicitud=>{
        resSolicitud.forEach(element => {
          if (element.idSolicitudSC.id == Number(this.data) && element.idUsuario.id == Number(sessionStorage.getItem("id")) && element.idEstado.id == 65) {
            historial.id = element.id
            historial.idSolicitudSC = element.idSolicitudSC
            this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
              historial.idEstado = resEstado
              historial.idUsuario = element.idUsuario
              if(this.usuarios.value.length >= 1){
                this.modificarHistorial(historial, element.idSolicitudSC)
              }else{
                this.modificarHistorial3(historial);
              }
            })
          }
        });
      })
    }
  }

  public modificarHistorial(historial: HistorialSolicitudes, resSoli){
    this.servicioHistorial.actualizar(historial).subscribe(res=>{
      let historial : HistorialSolicitudes = new HistorialSolicitudes();
      for (let i = 0; i < this.usuarios.value.length; i++) {
        const element:any = this.usuarios.value[i];
        historial.observacion = ""
        historial.idSolicitudSC = resSoli
        this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
          historial.idEstado = resEstado
          this.servicioUsuario.listarPorId(element.idUsuario.id).subscribe(resUsuarios=>{
            historial.idUsuario = resUsuarios
            this.registrarHistorial2(historial);
          })
        })
      }
      this.generarSoporte(res);
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

  public generarSoporte(idHistorial:any){
    if(this.listaArchivos2.length >= 1){
      let soporte : SoporteSC = new SoporteSC();
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitudSc=>{
        soporte.idSolicitudSC = resSolicitudSc
        this.servicioHistorial.listarPorId(idHistorial.id).subscribe(resHistorial=>{
          soporte.idHistorial = resHistorial
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
            soporte.idUsuario = resUsuario
            this.listaArchivos2.forEach(element => {
              soporte.descripcion = element
              this.registrarSoporte(soporte);
            });
          })
        })
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
      window.location.reload();
      // this.router.navigate(['/solicitudesSC']);
    }
  }

  public registrarSoporte(soporte: SoporteSC){
    this.servicioSoporte.registrar(soporte).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comentario Agregado!',
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

  public modificarHistorial3(historial: HistorialSolicitudes){
    this.servicioHistorial.actualizar(historial).subscribe(res=>{
      this.servicioHistorial.listarTodos().subscribe(resHistorial=>{
        resHistorial.forEach(element => {
          if(element.idSolicitudSC.id == Number(this.data)){
            this.listarHistorial.push(element)
          }
        });
        var contador = 0
        this.listarHistorial.forEach(element => {
          if(element.idEstado.id == 66){
            contador = contador + 1
          }
        });
        let solicitudSc : SolicitudSC = new SolicitudSC();
        if(contador == this.listarHistorial.length){
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
            solicitudSc.idClienteSC = resSolicitud.idClienteSC
            this.servicioEstado.listarPorId(64).subscribe(resEstado=>{
              solicitudSc.idEstado = resEstado
              this.modificarSolicitudSc2(solicitudSc, res);
            })
          })
        }else{
          if(this.listaArchivos2.length >= 1){
            let soporte : SoporteSC = new SoporteSC();
            soporte.idSolicitudSC = solicitudSc
            this.servicioHistorial.listarPorId(historial.id).subscribe(resHistorial=>{
              soporte.idHistorial = resHistorial
              this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
                soporte.idUsuario = resUsuario
                this.listaArchivos2.forEach(element => {
                  soporte.descripcion = element
                  this.registrarSoporte(soporte);
                });
              })
            })
          }else{
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Comentario Agregado!',
              showConfirmButton: false,
              timer: 1500
            })
            window.location.reload();
            // this.router.navigate(['/solicitudesSC']);
          }
        }
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

  public modificarSolicitudSc2(solicitudSc: SolicitudSC, idHistorial:any){
    this.servicioSolicitudSc.actualizar(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        let soporte : SoporteSC = new SoporteSC();
        soporte.idSolicitudSC = solicitudSc
        this.servicioHistorial.listarPorId(idHistorial.id).subscribe(resHistorial=>{
          soporte.idHistorial = resHistorial
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
            soporte.idUsuario = resUsuario
            this.listaArchivos2.forEach(element => {
              soporte.descripcion = element
              this.registrarSoporte(soporte);
            });
          })
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
        window.location.reload();
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
