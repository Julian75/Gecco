import { AuditoriaActivoRegistro } from './../../../modelos/audioriaActivoRegistro';
import { ConsultasGeneralesService } from './../../../servicios/consultasGenerales.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { VisitasSiga } from './../../../modelos/modelosSiga/visitasSiga';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { SitioVenta } from './../../../modelos/modelosSiga/sitioVenta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { AuditoriaActivo } from 'src/app/modelos/auditoriaActivo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AuditoriaActivoService } from 'src/app/servicios/auditoriaActivo.service';
import { CorreoAuditoria } from 'src/app/modelos/correoAuditoria';
import { CorreoAuditoriaService } from 'src/app/servicios/correoAuditoria.service';
import { Correo } from 'src/app/modelos/correo';
import { AuditoriaActivoRegistroService } from 'src/app/servicios/auditoriaActivoRegistro.service';

export interface Task {
  name: {};
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-auditoria-control-interno',
  templateUrl: './auditoria-control-interno.component.html',
  styleUrls: ['./auditoria-control-interno.component.css']
})
export class AuditoriaControlInternoComponent implements OnInit {
  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  dtOptions: any = {};
  public formAuditoria!: FormGroup;
  public listaOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaIdOficinas: any = [];
  public idSitioVenta: any;
  public listaAsignacionesPuntoVenta: any = [];
  public activosVisualizar:boolean = false;
  public activosSeleccionados: any = [];

  displayedColumns = ['id', 'articulo', 'codigoContable', 'marca', 'placa', 'serial', 'usuarioAsignado', 'Opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioAsignacionActivo : AsignacionArticulosService,
    private servicioAsignacionPuntoVentaActivos : AsignacionPuntoVentaService,
    private servicioAuditoriaActivo : AuditoriaActivoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreoAuditoria: CorreoAuditoriaService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioAuditoriaActivoRegistro: AuditoriaActivoRegistroService,
    private servicioCorreo: CorreoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
  }
  private crearFormulario() {
    this.formAuditoria = this.fb.group({
      id: 0,
      sitioVenta: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  id: any // Id de la oficina capturado - 18

  idOficina(event: any){
    const listaOficina = event.value
    this.listaIdOficinas.push(listaOficina.ideOficina)

    let ultimo = this.listaIdOficinas[this.listaIdOficinas.length - 1]
    let penultimo = this.listaIdOficinas[this.listaIdOficinas.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.listaSitioVenta = []
      this.servicioSitioVenta.listarPorId(ultimo).subscribe(res=>{
        this.listarSitioVentas = res
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(""),
          map(value => {
            // const num_identificacion = typeof value == 'string' ? value : value?.ideSitioventa;
            const nombres = typeof value == 'string' ? value : value?.nom_sitioventa;
            return nombres ? this._filter(nombres as string, this.listarSitioVentas) : this.listarSitioVentas.slice();
          }),
        );
      })
    }
  }

  textoUsuarioVendedor:any
  displayFn(sitioVenta: SitioVenta): any {
    this.textoUsuarioVendedor = sitioVenta
    if(this.textoUsuarioVendedor == ""){
      this.textoUsuarioVendedor = " "
    }else{
      this.textoUsuarioVendedor = sitioVenta.nom_sitioventa

      return this.textoUsuarioVendedor;
    }
  }

  public _filter(nombres: string, vendedores:any): VisitasSiga[] {

    const filterNom = nombres.toLowerCase();

    return vendedores.filter((vendedores:any) => (vendedores.nom_sitioventa.toLowerCase().includes(filterNom)));
  }

  //capturaraIdSitioVenta
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idSitioVenta = event.option.value
  }

  public guardar(){
    this.activosVisualizar = false
    if(this.formAuditoria.controls['oficina'].value == undefined || this.idSitioVenta == undefined){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe seleccionar la oficina y sitio de venta!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.listaAsignacionesPuntoVenta = []
      this.activosSeleccionados = []
      this.servicioAsignacionPuntoVentaActivos.listarTodos().subscribe(resAsignacionesPuntosVentasActivos=>{
        resAsignacionesPuntosVentasActivos.forEach(elementAsignacionPuntoVentaActivo => {
          if(elementAsignacionPuntoVentaActivo.idAsignacionesArticulos.idEstado.id == 76 && elementAsignacionPuntoVentaActivo.idOficina == this.formAuditoria.controls['oficina'].value.ideOficina && elementAsignacionPuntoVentaActivo.idSitioVenta == this.idSitioVenta.ideSitioventa){
            this.listaAsignacionesPuntoVenta.push(elementAsignacionPuntoVentaActivo)
          }
        });
        if(this.listaAsignacionesPuntoVenta.length <= 0){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay ningun activo asignado a ese punto de venta!',
            showConfirmButton: false,
            timer: 3500
          })
        }else{
          this.dataSource = new MatTableDataSource(this.listaAsignacionesPuntoVenta);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.activosVisualizar = true
        }
      })
    }
  }

  existe: boolean = false;
  listaExiste = []
  idPosicionActivo: any
  capturarActivos(checked: any, activoSeleccionado){
    console.log(checked)
    this.listaExiste = []
    this.idPosicionActivo
    var obj = {
      activo: {},
      seleccion: checked.checked
    }
    if(this.activosSeleccionados.length <= 0){
      obj.activo = activoSeleccionado
      this.activosSeleccionados.push(obj)
    }else{
      for (let index = 0; index < this.activosSeleccionados.length; index++) {
        const element = this.activosSeleccionados[index];
        if(element.activo.idAsignacionesArticulos.idDetalleArticulo.id == activoSeleccionado.idAsignacionesArticulos.idDetalleArticulo.id){
          this.existe = true
          this.idPosicionActivo = index
        }else{
          this.existe = false
        }
        this.listaExiste.push(this.existe)
      }
      const existeActivoLista = this.listaExiste.includes(true)
      if(existeActivoLista == true){
        var obj2 = {
          activo: activoSeleccionado,
          seleccion: checked.checked
        }
        this.activosSeleccionados.splice(this.idPosicionActivo, 1, obj2)
      }else{
        obj.activo = activoSeleccionado
        this.activosSeleccionados.push(obj)
      }
    }
  }

  generarAuditoria(){
    if(this.activosSeleccionados.length != this.listaAsignacionesPuntoVenta.length){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      if(this.activosSeleccionados.length <= 0){
        this.listaAsignacionesPuntoVenta.forEach(elementActivo => {
          var obj = {
            activo: elementActivo,
            seleccion: false
          }
          this.activosSeleccionados.push(obj)
        })
      }else{
        this.listaAsignacionesPuntoVenta.forEach(elementActivo => {
          for (let index = 0; index < this.activosSeleccionados.length; index++) {
            const element = this.activosSeleccionados[index];
            if(element.activo.idAsignacionesArticulos.idDetalleArticulo.id != elementActivo.idAsignacionesArticulos.idDetalleArticulo.id){
              var obj = {
                activo: elementActivo,
                seleccion: false
              }
              this.activosSeleccionados.push(obj)
            }
          }
        });
      }
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    }
    if(this.activosSeleccionados.length == this.listaAsignacionesPuntoVenta.length){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.registrarAuditorias()
    }
  }

  fechaActual: Date = new Date();
  correo: any;
  contrasena: any;
  existeCorreo: boolean = false;
  listaExisteCorreo: any = [];
  registrarAuditorias(){
    let auditoriaActivoRegistro : AuditoriaActivoRegistro = new AuditoriaActivoRegistro();
    auditoriaActivoRegistro.fecha = this.fechaActual
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
      auditoriaActivoRegistro.idUsuario = resUsuarioLogueado
      var splitFecha = String(auditoriaActivoRegistro.fecha).split('-')
      splitFecha = String(splitFecha[0]).split(' ')
      var fechaConsultaGeneral = String(splitFecha[3]+"-"+(this.fechaActual.getMonth()+1)+"-"+splitFecha[2]+" "+splitFecha[4])
      console.log(fechaConsultaGeneral, resUsuarioLogueado.id)
      this.servicioAuditoriaActivoRegistro.registrar(auditoriaActivoRegistro).subscribe(resAuditoriaActivoRegistro=>{
        this.servicioConsultasGenerales.listarAuditoriaActivosRegistro(fechaConsultaGeneral, resUsuarioLogueado.id).subscribe(resAuditoriaActivoRegistroId=>{
          resAuditoriaActivoRegistroId.forEach(elementAuditoriaActivoRegistroId => {
            this.servicioAuditoriaActivoRegistro.listarPorId(Number(elementAuditoriaActivoRegistroId.id)).subscribe(resAuditoriaActivoRegistroIde=>{
              for (let index = 0; index < this.activosSeleccionados.length; index++) {
                const elementActivoSeleccionado = this.activosSeleccionados[index];
                let auditoriaActivo : AuditoriaActivo = new AuditoriaActivo();
                if(elementActivoSeleccionado.seleccion == true){
                  auditoriaActivo.estado = "Validado"
                  auditoriaActivo.idAsignacionPuntoVentaArticulo = elementActivoSeleccionado.activo
                  auditoriaActivo.idAuditoriaActivoRegistro = resAuditoriaActivoRegistroIde
                  this.servicioAuditoriaActivo.registrar(auditoriaActivo).subscribe(resAuditoriaActivo=>{
                  })
                }else{
                  auditoriaActivo.estado = "No Validado"
                  auditoriaActivo.idAsignacionPuntoVentaArticulo = elementActivoSeleccionado.activo
                  auditoriaActivo.idAuditoriaActivoRegistro = resAuditoriaActivoRegistroIde
                  this.servicioAuditoriaActivo.registrar(auditoriaActivo).subscribe(resAuditoriaActivo=>{
                    let correoAuditoria : CorreoAuditoria = new CorreoAuditoria();
                    console.log(elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.id)
                    this.servicioConsultasGenerales.listarAuditoriaActivos(resAuditoriaActivoRegistroIde.id, elementActivoSeleccionado.activo.id).subscribe(resAuditoriaActivoId=>{
                      resAuditoriaActivoId.forEach(elementAuditoriaId => {
                        console.log(elementAuditoriaId, elementAuditoriaId.id)
                        this.servicioAuditoriaActivo.listarPorId(elementAuditoriaId.id).subscribe(resAuditoriaIdList=>{
                          console.log(resAuditoriaIdList)
                          correoAuditoria.idAuditoriaActivo = resAuditoriaIdList
                          correoAuditoria.asunto = "Auditoria Activos"
                          console.log(elementActivoSeleccionado.activo)
                          correoAuditoria.mensaje = "Según la respectiva auditoria a la oficina "+elementActivoSeleccionado.activo.nombreOficina.toLowerCase()+" del punto de venta "+elementActivoSeleccionado.activo.nombreSitioVenta.toLowerCase()+", el activo "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion.toLowerCase()+" con marca "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.marca.toLowerCase()+", serial "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.serial.toLowerCase()+" y placa "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idDetalleArticulo.placa.toLowerCase()+" asignado al usuario "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre.toLowerCase()+" "+elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido.toLowerCase()+", no se encuentra en ese punto de venta."
                          correoAuditoria.idUsuarioEnvias = resUsuarioLogueado
                          this.servicioUsuario.listarPorId(Number(elementActivoSeleccionado.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id)).subscribe(resUsuarioCorreo=>{
                            correoAuditoria.idUsuarioRecibe = resUsuarioCorreo
                            console.log(correoAuditoria)
                            this.servicioCorreoAuditoria.registrar(correoAuditoria).subscribe(correoAuditoriaRegistrado=>{

                            })
                          })
                        })
                      });
                    })
                  })
                }
                if((index+1) == this.activosSeleccionados.length){
                  this.listaExisteCorreo = []
                  this.activosSeleccionados.forEach(elementActivo => {
                    if(elementActivo.seleccion == false){
                      this.existeCorreo = true
                    }else{
                      this.existeCorreo = false
                    }
                    this.listaExisteCorreo.push(this.existeCorreo)
                  });
                  const existeCorreo = this.listaExisteCorreo.includes(true)
                  if(existeCorreo == true){
                    var listaUsuariosEnviar = []
                    for (let index = 0; index < this.activosSeleccionados.length; index++) {
                      const elementActivo = this.activosSeleccionados[index];
                      if(listaUsuariosEnviar.length <= 0){
                        listaUsuariosEnviar.push(elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id)
                      }else{
                        for (let index = 0; index < listaUsuariosEnviar.length; index++) {
                          const element = listaUsuariosEnviar[index];
                          if(element != elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id){
                            listaUsuariosEnviar.push(elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id)
                          }
                        }
                      }
                      if((index+1) == this.activosSeleccionados.length){
                        for (let index = 0; index < listaUsuariosEnviar.length; index++) {
                          const element = listaUsuariosEnviar[index];
                          this.servicioUsuario.listarPorId(Number(element)).subscribe(resUsuarioCorreo=>{
                            let correo : Correo = new Correo();
                            this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
                              resConfiguracion.forEach(elementConfi => {
                                if(elementConfi.nombre == "correo_gecco"){
                                  this.correo = elementConfi.valor
                                }
                                if(elementConfi.nombre == "contraseña_correo"){
                                  this.contrasena = elementConfi.valor
                                }
                              });
                              correo.correo = this.correo
                              correo.contrasena = this.contrasena
                              correo.to = resUsuarioCorreo.correo
                              correo.subject = "Auditoria de Activos"
                              correo.messaje = "<!doctype html>"
                              +"<html>"
                              +"<head>"
                              +"<meta charset='utf-8'>"
                              +"</head>"
                              +"<body>"
                              +"<h3 style='color: black;'>Segun la respectiva auditoria a los activos que a continuacion se mencionaran, los cuales tiene asignados, no se encuentra en el punto de venta que se asignaron. Los cuales son: </h3>"
                              +"<br>"
                              +"<table style='border: 1px solid #000; text-align: center;'>"
                              +"<tr>"
                              +"<th style='border: 1px solid #000;'>Tipo Articulo</th>"
                              +"<th style='border: 1px solid #000;'>Marca</th>"
                              +"<th style='border: 1px solid #000;'>Placa</th>"
                              +"<th style='border: 1px solid #000;'>Serial</th>"
                              +"<th style='border: 1px solid #000;'>Oficina Asignada</th>"
                              +"<th style='border: 1px solid #000;'>Sitio de Venta Asignado</th>"
                              +"<th style='border: 1px solid #000;'>Usuario Asignado</th>";
                              this.activosSeleccionados.forEach(elementActivo => {
                                if (elementActivo.seleccion == false && elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id == resUsuarioCorreo.id) {
                                  correo.messaje += "<tr>"
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.idAsignacionesArticulos.idDetalleArticulo.marca+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.idAsignacionesArticulos.idDetalleArticulo.placa+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.idAsignacionesArticulos.idDetalleArticulo.serial+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.nombreOficina+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.nombreSitioVenta+"</td>";
                                  correo.messaje += "<td style='border: 1px solid #000;'>"+elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+elementActivo.activo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+"</td>";
                                  correo.messaje += "</tr>";
                                }
                              });
                              correo.messaje += "</table>"
                              +"<br>"
                              +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
                              +"</body>"
                              +"</html>";
                              this.servicioCorreo.enviar(correo).subscribe(res =>{
                                if((index+1) == listaUsuariosEnviar.length){
                                  document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                                  Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Se ha registrado la auditoria!',
                                    showConfirmButton: false,
                                    timer: 4500
                                  })
                                  window.location.reload();
                                }
                              })
                            })
                          })

                        }
                      }
                    }
                  }else{
                    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Se ha registrado la auditoria!',
                      showConfirmButton: false,
                      timer: 4500
                    })
                    window.location.reload();
                  }
                }
              }
            })
          });
        })
      })
    })
  }

}
