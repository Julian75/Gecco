import { SolicitudSC2 } from './../../../../modelos/modelos2/solicitudSC2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Historial2 } from './../../../../modelos/modelos2/Historial2';
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
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';

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
    private servicioModificar : ModificarService,
    private servicioAsignacionPqrs : AsignarUsuariosPqrService,
    private servicioEscala : EscalaSolicitudesService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public historial: MatDialogRef<ModificarHistorialRemisionComponent>,
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

  usuarioMatrix: boolean = false
  usuarioMatrix2: boolean = false
  listaUsuarioMatrix: any = []
  public listarAsignacionUsuario(){
    this.servicioAsignacionPqrs.listarTodos().subscribe(res=>{
      this.listarUsuarios = res
    })
    this.servicioHistorial.listarTodos().subscribe(resHistorial=>{
      resHistorial.forEach(elementHistorial => {
        if(elementHistorial.idUsuario.id == Number(sessionStorage.getItem('id')) && elementHistorial.idEstado.id == 65){
          this.servicioAsignacionPqrs.listarTodos().subscribe(resAsigUsuPQRS=>{
            resAsigUsuPQRS.forEach(elementUsuarioPqrs => {
              if((elementUsuarioPqrs.idUsuario.id == elementHistorial.idUsuario.id && elementUsuarioPqrs.idArea.id == 1) || (elementUsuarioPqrs.idUsuario.id == elementHistorial.idUsuario.id && elementUsuarioPqrs.idArea.id == 2)){
                this.usuarioMatrix = true
              }else{ this.usuarioMatrix = false }
              this.listaUsuarioMatrix.push(this.usuarioMatrix)
            });
            this.usuarioMatrix2 = this.listaUsuarioMatrix.includes( true )
          })
        }
      });
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

    this.servicioSubirPdf.subirArchivoSegunda(file).subscribe((event:any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileInfos = this.servicioSubirPdf.listarTodosSegunda();
      }
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      this.historial.close();
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
      let historial : Historial2 = new Historial2();
      historial.observacion = comentario
      this.servicioHistorial.listarTodos().subscribe(resSolicitud=>{
        resSolicitud.forEach(element => {
          if (element.idSolicitudSC.id == Number(this.data) && element.idUsuario.id == Number(sessionStorage.getItem("id")) && element.idEstado.id == 65) {
            historial.id = element.id
            historial.id_solicitud_sc = element.idSolicitudSC.id
            this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
              historial.idEstado = resEstado.id
              historial.idUsuario = element.idUsuario.id
              if(element.idSolicitudSC.incidente == "" && element.idSolicitudSC.idEscala.id == 3){
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Si desea adjuntar su comentario debe primero colocar el incidente!',
                  showConfirmButton: false,
                  timer: 2500
                })
                this.historial.close()
              }else{
                if(this.usuarios.value.length >= 1){
                  this.modificarHistorial(historial, element.idSolicitudSC)
                }else{
                  this.modificarHistorial3(historial);
                }
              }
            })
          }
        });
      })
    }
  }

  listaVerificacion: any = []
  public modificarHistorial(historial2: Historial2, resSoli){
    this.listaVerificacion = []
    this.servicioEscala.listarPorId(3).subscribe(resEscala=>{
      this.servicioModificar.actualizarHistorialSC(historial2).subscribe(res=>{
        if(this.aprobar2 == true){
          console.log("hola")
          let solicitudSc : SolicitudSC2 = new SolicitudSC2();
          this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            solicitudSc.id = resSolicitud.id
            solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
            var fechaActual = new Date(resSolicitud.fecha)
            fechaActual.setDate(fechaActual.getDate()+1)
            solicitudSc.fecha = fechaActual
            if(this.aprobar2 == true){
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
              this.servicioModificar.actualizarSolicitudSC(solicitudSc).subscribe(res=>{
                let historial : HistorialSolicitudes = new HistorialSolicitudes();
                for (let i = 0; i < this.usuarios.value.length; i++) {
                  const element:any = this.usuarios.value[i];
                  historial.observacion = ""
                  historial.idSolicitudSC = resSoli
                  this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
                    historial.idEstado = resEstado
                    this.servicioUsuario.listarPorId(element.idUsuario.id).subscribe(resUsuarios=>{
                      historial.idUsuario = resUsuarios
                      console.log("hola2")
                      this.registrarHistorial2(historial, historial2, i, this.usuarios.value.length);
                    })
                  })
                }
              })
            })
          })
        }else{
          let historial : HistorialSolicitudes = new HistorialSolicitudes();
          for (let i = 0; i < this.usuarios.value.length; i++) {
            const element:any = this.usuarios.value[i];
            historial.observacion = ""
            historial.idSolicitudSC = resSoli
            this.servicioEstado.listarPorId(65).subscribe(resEstado=>{
              historial.idEstado = resEstado
              this.servicioUsuario.listarPorId(element.idUsuario.id).subscribe(resUsuarios=>{
                historial.idUsuario = resUsuarios
                this.registrarHistorial2(historial, historial2, i, this.usuarios.value.length);
              })
            })
          }
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
    })
  }

  public registrarHistorial2(historial: HistorialSolicitudes, historial2, i, usuarios){
    console.log("hola3")
    this.servicioHistorial.registrar(historial).subscribe(res=>{
      if((i+1) == usuarios){
        console.log("hola5")
        this.generarSoporte(historial2);
      }
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
    console.log("hola6")
    console.log(idHistorial)
    if(this.listaArchivos2.length >= 1){
      console.log("hola7")
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
    }
  }

  public registrarSoporte(soporte: SoporteSC){
    this.servicioSoporte.registrar(soporte).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
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

  public modificarHistorial3(historial: Historial2){
    this.servicioEscala.listarPorId(3).subscribe(resEscala=>{
      this.servicioModificar.actualizarHistorialSC(historial).subscribe(res=>{
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
          let solicitudSc : SolicitudSC2 = new SolicitudSC2();
          if(contador == this.listarHistorial.length){
            this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
              solicitudSc.auxiliarRadicacion = resSolicitud.auxiliarRadicacion
              var fechaActual = new Date(resSolicitud.fecha)
              fechaActual.setDate(fechaActual.getDate()+1)
              solicitudSc.fecha = fechaActual
              solicitudSc.id = resSolicitud.id
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
              this.servicioEstado.listarPorId(64).subscribe(resEstado=>{
                solicitudSc.idEstado = resEstado.id
                this.modificarSolicitudSc2(solicitudSc, historial);
              })
            })
          }else{
            if(this.listaArchivos2.length >= 1){
              let soporte : SoporteSC = new SoporteSC();
              this.servicioSolicitudSc.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
                soporte.idSolicitudSC = resSolicitud
                this.servicioHistorial.listarPorId(historial.id).subscribe(resHistorial=>{
                  soporte.idHistorial = resHistorial
                  this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
                    soporte.idUsuario = resUsuario
                    this.listaArchivos2.forEach(element => {
                      soporte.descripcion = element
                      this.registrarSoporte2(soporte);
                    });
                  })
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
    })
  }

  public registrarSoporte2(soporte: SoporteSC){
    this.servicioSoporte.registrar(soporte).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comentario Generado!',
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

  public modificarSolicitudSc2(solicitudSc: SolicitudSC2, idHistorial:any){
    this.servicioModificar.actualizarSolicitudSC(solicitudSc).subscribe(res=>{
      if(this.listaArchivos2.length >= 1){
        let soporte : SoporteSC = new SoporteSC();
        this.servicioSolicitudSc.listarPorId(solicitudSc.id).subscribe(resSolicitudSC=>{
          soporte.idSolicitudSC = resSolicitudSC
          this.servicioHistorial.listarPorId(idHistorial.id).subscribe(resHistorial=>{
            soporte.idHistorial = resHistorial
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
              soporte.idUsuario = resUsuario
              this.listaArchivos2.forEach(element => {
                soporte.descripcion = element
                this.registrarSoporte2(soporte);
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

  //Para los de Juridica y Auxiliar de Cumplimiento
  opcion2:any
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

}
