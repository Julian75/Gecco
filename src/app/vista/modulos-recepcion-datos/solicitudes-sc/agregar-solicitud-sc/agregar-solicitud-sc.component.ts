import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteScComponent } from './../../cliente-sc/agregar-cliente-sc/agregar-cliente-sc.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';
import { SolicitudSC } from 'src/app/modelos/solicitudSC';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ArchivoSolicitudService } from 'src/app/servicios/archivoSolicitud.service';
import { ArchivoSolicitud } from 'src/app/modelos/archivoSolicitud';
import { ClienteSCService } from 'src/app/servicios/clienteSC.service';
import { ClienteSC } from 'src/app/modelos/clienteSC';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AgregarClienteScModalComponent } from '../../cliente-sc/agregar-cliente-sc-modal/agregar-cliente-sc-modal.component';

@Component({
  selector: 'app-agregar-solicitud-sc',
  templateUrl: './agregar-solicitud-sc.component.html',
  styleUrls: ['./agregar-solicitud-sc.component.css']
})
export class AgregarSolicitudScComponent implements OnInit {

  myControl = new FormControl<string | ClienteSC>("");
  options: ClienteSC[] = [];
  filteredOptions!: Observable<ClienteSC[]>;

  public formSolicitud!: FormGroup;
  public listaMotivoSolicitud: any = [];
  public listaTipoServicio: any = [];
  public listaClientes: any = [];
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
    private servicioArchivoSolicitud : ArchivoSolicitudService,
    private servicioCliente : ClienteSCService,
    private servicioUsuario : UsuarioService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarMotivoSolicitud();
    this.listarTipoServicio();
    this.listarClienteSC();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      cliente: [null,Validators.required],
      vence: [null,Validators.required],
      municipio: [null,Validators.required],
      incidente: [null],
      motivo: [null,Validators.required],
      radicacion: [null,Validators.required],
      servicio: [null,Validators.required],
      auxiliar: [null,Validators.required]
    });
  }

  public listarClienteSC(){
    this.servicioCliente.listarTodos().subscribe(res=>{
      this.listaClientes = res
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => {
          const num_identificacion = typeof value == 'string' ? value : value?.documento.toString();
          return num_identificacion ? this._filter(num_identificacion as string, this.listaClientes) : this.listaClientes.slice();
        }),
      );
    })
  }

  textoCliente:any
  displayFn(clientesc: ClienteSC): any {
    this.textoCliente = clientesc
    if(this.textoCliente == ""){
      this.textoCliente = " "
    }else{
      this.textoCliente = clientesc.documento.toString()

      return this.textoCliente;
    }
  }

  num:any
  public _filter(numIdentificacion: string, clientesc:any): ClienteSC[] {

    const filterValue = numIdentificacion;

    this.num = (clientesc.filter((clientesc:any) => (clientesc.documento.toString().includes(filterValue)))).length
    return clientesc.filter((clientesc:any) => (clientesc.documento.toString().includes(filterValue)));
  }

  cliente: any;
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.cliente = event.option.value
    // this.idVendedortabla(event.option.value)
  }

  public listarMotivoSolicitud(){
    this.servicioMotivoSolicitud.listarTodos().subscribe(res=>{
      this.listaMotivoSolicitud = res
    })
  }

  listaMunicipios: any = [];
  public listarTipoServicio(){
    this.servicioTipoServicio.listarTodos().subscribe(res=>{
      this.listaTipoServicio = res
      const jsonMunicipDep = require('../../../../../assets/departamentos-municipios/munidep.json');
      this.listaMunicipios = jsonMunicipDep.data
    })
  }

  public agregarClienteServicCliente(){
    const dialogRef = this.dialog.open(AgregarClienteScModalComponent, {
      width: '830px',
      height: '530px'
    });
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
    console.log(this.cliente, idMotivo, vencimiento, radicacion, municipio, idServicio, auxiliar)
    if(this.cliente == undefined || vencimiento == null || municipio == null || idMotivo == null || radicacion == null || idServicio == null || auxiliar == null){
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
        solicitudSc.vence = new Date(fechaVencimiento2)
        solicitudSc.municipio = municipio
        this.servicioCliente.listarPorId(this.cliente.id).subscribe(resCliente=>{
          solicitudSc.idClienteSC = resCliente
          this.servicioMotivoSolicitud.listarPorId(idMotivo).subscribe(resMotivo=>{
            solicitudSc.idMotivoSolicitud = resMotivo
            solicitudSc.medioRadicacion = radicacion
            solicitudSc.prorroga = "No"
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
      let archivo : ArchivoSolicitud = new ArchivoSolicitud();
      this.servicioSolicitudSc.listarPorId(solicitud.id).subscribe(resSolicitud=>{
        archivo.idSolicitudSC = resSolicitud
          this.listaArchivos2.forEach(element => {
            archivo.nombreArchivo = element
            this.registrarSoportes2(archivo);
          });
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

  public registrarSoportes2(archivo: ArchivoSolicitud){
    this.servicioArchivoSolicitud.registrar(archivo).subscribe(res=>{
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
