import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';
import { SolicitudSC } from 'src/app/modelos/solicitudSC';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { SoporteSCService } from 'src/app/servicios/soporteSC.service';
import { SoporteSC } from 'src/app/modelos/soporteSC';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-agregar-solicitud-sc',
  templateUrl: './agregar-solicitud-sc.component.html',
  styleUrls: ['./agregar-solicitud-sc.component.css']
})
export class AgregarSolicitudScComponent implements OnInit {

  public formSolicitud!: FormGroup;
  public listaMotivoSolicitud: any = [];
  public listaTipoServicio: any = [];
  public fecha: Date = new Date();
  public fechaActual: any;

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
    private servicioMotivoSolicitud : MotivoSolicitudService,
    private servicioTipoServicio : TipoServicioService,
    private servicioEscala : EscalaSolicitudesService,
    private servicioEstado : EstadoService,
    private servicioSolicitudSc : SolicitudSCService,
    private servicioSoporteSc : SoporteSCService,
    private servicioUsuario : UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarMotivoSolicitud();
    this.listarTipoServicio();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      vence: [null,Validators.required],
      municipio: [null,Validators.required],
      incidente: [null],
      motivo: [null,Validators.required],
      radicacion: [null,Validators.required],
      servicio: [null,Validators.required],
      auxiliar: [null,Validators.required]
    });
  }

  public listarMotivoSolicitud(){
    this.servicioMotivoSolicitud.listarTodos().subscribe(res=>{
      this.listaMotivoSolicitud = res
    })
  }

  public listarTipoServicio(){
    this.servicioTipoServicio.listarTodos().subscribe(res=>{
      this.listaTipoServicio = res
    })
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
      this.router.navigate(['/solicitudesSC']);
      window.location.reload();
    },
    err => {
      this.progressInfo[index].value = 0;
      this.message = 'No se puede subir el archivo ' + file.name;
    });
  }

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var vencimiento = this.formSolicitud.controls['vence'].value;
    var municipio = this.formSolicitud.controls['municipio'].value;
    var incidente = this.formSolicitud.controls['incidente'].value;
    var idMotivo = this.formSolicitud.controls['motivo'].value;
    var radicacion = this.formSolicitud.controls['radicacion'].value;
    var idServicio = this.formSolicitud.controls['servicio'].value;
    var auxiliar = this.formSolicitud.controls['auxiliar'].value;
    var fechaVencimiento = new Date(vencimiento)
    this.fechaActual = this.fecha.getFullYear() + "-"+ (this.fecha.getMonth()+1)+ "-" +this.fecha.getDate();
    var fechaVencimiento2 = fechaVencimiento.getFullYear() + "-"+ (fechaVencimiento.getMonth()+1)+ "-" +(fechaVencimiento.getDate()+1);
    if(fechaVencimiento == null || municipio == "" || idMotivo == null || radicacion == "" || idServicio == null || auxiliar == ""){
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      if (new Date(fechaVencimiento2) < new Date(this.fechaActual)) {
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'La fecha de vencimiento no puede ser menor a la fecha actual!',
          showConfirmButton: false,
          timer: 2500
        })
      }else{
        let solicitudSc : SolicitudSC = new SolicitudSC();
        solicitudSc.fecha = new Date(this.fechaActual)
        solicitudSc.vence = vencimiento
        solicitudSc.municipio = municipio
        this.servicioMotivoSolicitud.listarPorId(idMotivo).subscribe(resMotivo=>{
          solicitudSc.idMotivoSolicitud = resMotivo
          solicitudSc.medioRadicacion = radicacion
          this.servicioTipoServicio.listarPorId(idServicio).subscribe(resServicio=>{
            solicitudSc.idTipoServicio = resServicio
            solicitudSc.auxiliarRadicacion = auxiliar
            this.servicioEscala.listarPorId(1).subscribe(resEscala=>{
              solicitudSc.idEscala = resEscala
              this.servicioEstado.listarPorId(62).subscribe(resEstado=>{
                solicitudSc.idEstado = resEstado
                if(incidente == null){
                  solicitudSc.incidente = ""
                  this.registrarSolicitudSc(solicitudSc);
                }else{
                  solicitudSc.incidente = incidente
                  this.registrarSolicitudSc(solicitudSc);
                }
              })
            })
          })
        })
      }
    }
  }

  public registrarSolicitudSc(solicitud: SolicitudSC){
    this.servicioSolicitudSc.registrar(solicitud).subscribe(res=>{
      this.registrarSoportes(res);
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar la Solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public registrarSoportes(solicitud: any){
    if(this.listaArchivos2.length >= 1){
      let soporteSc : SoporteSC = new SoporteSC();
      this.servicioSolicitudSc.listarPorId(solicitud.id).subscribe(resSolicitud=>{
        soporteSc.idSolicitudSC = resSolicitud
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
          soporteSc.idUsuario = resUsuario
          this.listaArchivos2.forEach(element => {
            soporteSc.descripcion = element
            this.registrarSoportes2(soporteSc);
          });
        })
      })
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/solicitudesSC']);
    }
  }

  public registrarSoportes2(soporte: SoporteSC){
    this.servicioSoporteSc.registrar(soporte).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.uploadFiles();
      // window.location.reload();
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
