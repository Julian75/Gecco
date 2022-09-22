import { ModificarService } from 'src/app/servicios/modificar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
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
import { SolicitudSC2 } from 'src/app/modelos/modelos2/solicitudSC2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';

@Component({
  selector: 'app-agregar-historial-solicitudes',
  templateUrl: './agregar-historial-solicitudes.component.html',
  styleUrls: ['./agregar-historial-solicitudes.component.css']
})
export class AgregarHistorialSolicitudesComponent implements OnInit {

  public formComentario!: FormGroup;
  public opcion: number = 0;
  public opcion2: number = 0;
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
    private http: HttpClient,
    private fb: FormBuilder,
    private servicioSubirPdf : SubirPdfService,
    private servicioSolicitudSc : SolicitudSCService,
    private servicioModificar : ModificarService,
    private servicioEstado : EstadoService,
    private servicioUsuario : UsuarioService,
    private servicioHistorial : HistorialSolicitudesService,
    private servicioSoporte : SoporteSCService,
    private servicioEscala : EscalaSolicitudesService,
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
      opcion: [null,Validators.required],
      opcion2: [null,Validators.required]
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

  aprobar2:boolean = false
  public capturarOpciones(opcion: number){
    this.opcion2 = opcion
    this.aprobar2 = false
    if(this.opcion2 == 3){
      this.aprobar2 = true
    }else if(this.opcion2 == 4){
      this.aprobar2 = false
    }
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

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var comentario = this.formComentario.controls['comentario'].value;
    var opcion = this.formComentario.controls['opcion'].value; // Escalar a matrix
    var opcion2 = this.formComentario.controls['opcion2'].value; // remitir  1 y 2
    console.log(comentario, opcion, opcion2)
    if(comentario == "" || comentario == null || opcion == null || opcion2 == null){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos o la seleccion no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      if(opcion2 == 1){
        if(this.usuarios.value.length >= 1){
          let historial : HistorialSolicitudes = new HistorialSolicitudes();
          historial.observacion = comentario
          this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            historial.idSolicitudSC = resSolicitud
            this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
              historial.idEstado = resEstado
              this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
                historial.idUsuario = resUsuario
                this.registrarHistorial(historial,this.usuarios, resSolicitud)
              })
            })
          })
        }else{
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Si desea remitir, seleccione a que usuarios!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }else{
        let historial : HistorialSolicitudes = new HistorialSolicitudes();
        historial.observacion = comentario
        this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
          historial.idSolicitudSC = resSolicitud
          this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
            historial.idEstado = resEstado
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              historial.idUsuario = resUsuario
              this.registrarHistorial3(historial);
            })
          })
        })
      }
    }
  }

  public registrarHistorial(historial: HistorialSolicitudes, usuarios: any, resSolic){
    this.servicioHistorial.registrar(historial).subscribe(res=>{
      if (this.opcion2 == 3) {
        let historial2 : HistorialSolicitudes = new HistorialSolicitudes();
        historial2.observacion = ""
        this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
          historial2.idEstado = resEstado
          this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            historial2.idSolicitudSC = resSolicitud
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              historial2.idUsuario = resUsuario
              this.servicioHistorial.registrar(historial2).subscribe(resHist=>{

              }, error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al generar el comentario para el Historial de Matrix!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            })
          })
        })
      }
      this.registrarHistorialUsuarios(usuarios, resSolic, res)
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

  escalacon:any
  public registrarHistorialUsuarios(usuarios: any, resSolic, idHistRegistrado){
    let historial : HistorialSolicitudes = new HistorialSolicitudes();
    this.servicioEscala.listarPorId(3).subscribe(resEscala=>{
      for (let i = 0; i < usuarios.value.length; i++) {
        const element:any = usuarios.value[i];
        historial.observacion = ""
        historial.idSolicitudSC = resSolic
        this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
          historial.idEstado = resEstado
          this.servicioUsuario.listarPorId(element.idUsuario.id).subscribe(resUsuarios=>{
            historial.idUsuario = resUsuarios
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
          })
        })
      }
      let solicitudSc : SolicitudSC2 = new SolicitudSC2();
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        solicitudSc.id = resSolicitud.id
        solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
        var fechaActual = new Date(resSolicitud.fecha)
        fechaActual.setDate(fechaActual.getDate()+1)
        solicitudSc.fecha = fechaActual
        if(this.opcion2 == 3){
          solicitudSc.idEscalaSolicitudes = resEscala.id
        }else{
          solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
        }
        solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
        solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
        solicitudSc.incidente = resSolicitud.incidente
        solicitudSc.prorroga = resSolicitud.prorroga
        solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
        solicitudSc.municipio = resSolicitud.municipio
        var fechavence = new Date(resSolicitud.vence)
        fechavence.setDate(fechavence.getDate()+1)
        solicitudSc.vence = fechavence
        solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
        this.servicioEstado.listarPorId(63).subscribe(resEstado=>{
          solicitudSc.idEstado = resEstado.id
          this.modificarSolicitudSc(solicitudSc, idHistRegistrado);
        })
      })
    })
  }

  public modificarSolicitudSc(solicitudSc: SolicitudSC2, idHistorial:any){
    var contador = 0
    this.servicioModificar.actualizarSolicitudSC(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        let soporte : SoporteSC = new SoporteSC();
        this.servicioSolicitudSc.listarPorId(solicitudSc.id).subscribe(resSolicitudSC=>{
          soporte.idSolicitudSC = resSolicitudSC
          this.servicioHistorial.listarPorId(idHistorial.id).subscribe(resHistorial=>{
            soporte.idHistorial = resHistorial
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              soporte.idUsuario = resUsuario
              this.listaArchivos.forEach(element => {
                for (let index = 0; index < element.length; index++) {
                  const element1 = element[index];
                  contador++
                  soporte.descripcion = element1.name
                  this.registrarSoporte(soporte, contador);
                }
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

  public registrarSoporte(soporte: SoporteSC, cont){
    console.log(cont)
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

  public registrarHistorial3(historial: HistorialSolicitudes){
    this.servicioHistorial.registrar(historial).subscribe(res=>{
      var opcion = this.formComentario.controls['opcion'].value;
      if (opcion == 3) {
        let historial2 : HistorialSolicitudes = new HistorialSolicitudes();
        historial2.observacion = ""
        this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
          historial2.idEstado = resEstado
          this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            historial2.idSolicitudSC = resSolicitud
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              historial2.idUsuario = resUsuario
              this.servicioHistorial.registrar(historial2).subscribe(resHist=>{
                this.datosSolicitud(res)
              }, error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al generar el comentario para el Historial de Matrix!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            })
          })
        })
      }else if(opcion == 4){
        let historial2 : HistorialSolicitudes = new HistorialSolicitudes();
        historial2.observacion = ""
        this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
          historial2.idEstado = resEstado
          this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            historial2.idSolicitudSC = resSolicitud
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              historial2.idUsuario = resUsuario
              this.servicioHistorial.registrar(historial2).subscribe(resHist=>{
                this.datosSolicitud(res)
              }, error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al generar el comentario para el Historial de Matrix!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            })
          })
        })
      }
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

  public datosSolicitud(idHistorial:any){
    var opcion = this.formComentario.controls['opcion'].value;
    let solicitudSc : SolicitudSC2 = new SolicitudSC2();
    if(opcion == 3){
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        this.servicioEscala.listarPorId(3).subscribe(resEscala=>{
          this.servicioEstado.listarPorId(63).subscribe(resEstado=>{
            solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
            var fechaActual = new Date(resSolicitud.fecha)
            fechaActual.setDate(fechaActual.getDate()+1)
            solicitudSc.fecha = fechaActual
            solicitudSc.id = resSolicitud.id
            solicitudSc.idEscalaSolicitudes = resEscala.id
            solicitudSc.idEstado = resEstado.id
            solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
            solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
            solicitudSc.incidente = resSolicitud.incidente
            solicitudSc.prorroga = resSolicitud.prorroga
            solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
            solicitudSc.municipio = resSolicitud.municipio
            var fechavence = new Date(resSolicitud.vence)
            fechavence.setDate(fechavence.getDate()+1)
            solicitudSc.vence = fechavence
            solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
            this.modificarSolicitudSc2(solicitudSc, idHistorial);
          })
        })
      })
    }else if(opcion == 4){
      this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        this.servicioEstado.listarPorId(67).subscribe(resEstado=>{
          solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
          var fechaActual = new Date(resSolicitud.fecha)
          fechaActual.setDate(fechaActual.getDate()+1)
          solicitudSc.fecha = fechaActual
          solicitudSc.id = resSolicitud.id
          solicitudSc.idEscalaSolicitudes = resSolicitud.idEscala.id
          solicitudSc.idEstado = resEstado.id
          solicitudSc.idMotivoSolicitud = resSolicitud.idMotivoSolicitud.id
          solicitudSc.idTipoServicio = resSolicitud.idTipoServicio.id
          solicitudSc.incidente = resSolicitud.incidente
          solicitudSc.prorroga = resSolicitud.prorroga
          solicitudSc.medioRadicacion = resSolicitud.medioRadicacion
          solicitudSc.municipio = resSolicitud.municipio
          var fechavence = new Date(resSolicitud.vence)
          fechavence.setDate(fechavence.getDate()+1)
          solicitudSc.vence = fechavence
          solicitudSc.idClienteSC = resSolicitud.idClienteSC.id
          this.modificarSolicitudSc2(solicitudSc, idHistorial);
        })
      })
    }
  }

  public modificarSolicitudSc2(solicitudSc: SolicitudSC2, idHistorial:any){
    var contador = 0
    this.servicioModificar.actualizarSolicitudSC(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        this.servicioSolicitudSc.listarPorId(solicitudSc.id).subscribe(resSolicitud=>{
          let soporte : SoporteSC = new SoporteSC();
          soporte.idSolicitudSC = resSolicitud
          this.servicioHistorial.listarPorId(idHistorial.id).subscribe(resHistorial=>{
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
