import { SolicitudBajasArticulosService } from './../../../servicios/solicitudBajasArticulos.service';
import { Correo } from 'src/app/modelos/correo';
import { SolicitudBajasArticulos2 } from './../../../modelos/modelos2/solicitudBajasArticulos2';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticulosBaja2 } from 'src/app/modelos/modelos2/articulosBaja2';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import * as XLSX from 'xlsx';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import Swal from 'sweetalert2';
import { ArticulosBaja } from 'src/app/modelos/articulosBaja';

@Component({
  selector: 'app-visualizar-activos-bajas-solicitud',
  templateUrl: './visualizar-activos-bajas-solicitud.component.html',
  styleUrls: ['./visualizar-activos-bajas-solicitud.component.css']
})
export class VisualizarActivosBajasSolicitudComponent implements OnInit {
  dtOptions: any = {};
  public listaActivosBaja: any = [];
  public idContable: number = 0;

  displayedColumns = ['id', 'activo', 'codigoUnico', 'marca', 'placa', 'serial', 'observacion', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioArticulosBaja: ArticulosBajaService,
    private servicioSolicitudBajaActivo: SolicitudBajasArticulosService,
    private servicioCorreo: CorreoService,
    private servicioModificar: ModificarService,
    private servicioUsuario: UsuarioService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioEstado: EstadoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VisualizarActivosBajasSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  informacionModal: any = [];
  ubicacionActual: any;
  public listarTodos () {
    this.ubicacionActual = localStorage.getItem('listaAutorizacionUbicacion')
    this.informacionModal = []
    this.listaActivosBaja = []
    for (const [key, value] of Object.entries(this.data)) {
      this.informacionModal.push(value)
    }
    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudBajaActivos=>{
      if(resSolicitudBajaActivos.idEstado.id == 80){
        this.servicioArticulosBaja.listarTodos().subscribe( resActivosBajaSolicitud =>{
          resActivosBajaSolicitud.forEach(elementActivoBajaSolicitud => {
            if(elementActivoBajaSolicitud.idSolicitudBaja.id == this.informacionModal[0]){
              this.listaActivosBaja.push(elementActivoBajaSolicitud)
            }
          });
          this.dataSource = new MatTableDataSource(this.listaActivosBaja);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }else if(resSolicitudBajaActivos.idEstado.id == 81){
        this.servicioArticulosBaja.listarTodos().subscribe( resActivosBajaSolicitud =>{
          resActivosBajaSolicitud.forEach(elementActivoBajaSolicitud => {
            if(elementActivoBajaSolicitud.idSolicitudBaja.id == this.informacionModal[0] && elementActivoBajaSolicitud.idEstado.id == 81){
              this.listaActivosBaja.push(elementActivoBajaSolicitud)
            }else if(elementActivoBajaSolicitud.idSolicitudBaja.id == this.informacionModal[0] && elementActivoBajaSolicitud.idEstado.id == 82){
              this.listaActivosBaja.push(elementActivoBajaSolicitud)
            }else if(elementActivoBajaSolicitud.idSolicitudBaja.id == this.informacionModal[0] && elementActivoBajaSolicitud.idEstado.id == 84){
              this.listaActivosBaja.push(elementActivoBajaSolicitud)
            }
          });
          this.dataSource = new MatTableDataSource(this.listaActivosBaja);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })
  }

  listaAceptado: any = [];
  aceptado: boolean = false;
  aceptarAutorizacion( id:number){
    if(this.informacionModal[1] == 1){
      this.idContable += this.informacionModal[1]+1
    }else{
      this.idContable += this.informacionModal[1]+1
    }
    console.log(this.idContable)
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(id).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(81).subscribe(resEstado=>{
        this.servicioEstado.listarPorId(83).subscribe(resEstadoRechazado=>{
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
            let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
            let solicitudBajaActivoMod : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
            activoBaja.id = resActivoBaja.id
            console.log(this.idContable)
            if(this.idContable == lengthActivos){
              document.getElementById('snipper07')?.setAttribute('style', 'display: block;')
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.servicioArticulosBaja.listarTodos().subscribe(resActivosBajaCompletos=>{
                  resActivosBajaCompletos.forEach(activoBaja => {
                    if(activoBaja.idSolicitudBaja.id == this.informacionModal[0]){
                      if(activoBaja.idEstado.id == 81){
                        this.aceptado = true
                      }else{
                        this.aceptado = false
                      }
                      this.listaAceptado.push(this.aceptado)
                    }
                  });
                  const existeAprobado = this.listaAceptado.includes(true)
                  if(existeAprobado == true){
                    solicitudBajaActivoMod.id = resActivoBaja.idSolicitudBaja.id
                    solicitudBajaActivoMod.fecha = resActivoBaja.idSolicitudBaja.fecha
                    solicitudBajaActivoMod.id_estado = resEstado.id
                    solicitudBajaActivoMod.id_usuario = resActivoBaja.idSolicitudBaja.idUsuario.id
                    solicitudBajaActivoMod.usuario_autorizacion = resUsuarioLogueado.id
                    solicitudBajaActivoMod.usuario_confirmacion = 0
                    this.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                  }else{
                    solicitudBajaActivoMod.id = resActivoBaja.idSolicitudBaja.id
                    solicitudBajaActivoMod.fecha = resActivoBaja.idSolicitudBaja.fecha
                    solicitudBajaActivoMod.id_estado = resEstadoRechazado.id
                    solicitudBajaActivoMod.id_usuario = resActivoBaja.idSolicitudBaja.idUsuario.id
                    solicitudBajaActivoMod.usuario_autorizacion = 0
                    solicitudBajaActivoMod.usuario_confirmacion = 0
                    this.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                  }
                })
              })
            }else{
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              console.log(activoBaja)
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.dialogRef.close();
                const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
                  width: '800px',
                  height: '440px',
                  data: {idSolicitudBaja: activoBaja.id_solicitud_baja, idContable: this.idContable}
                });
              })
            }
          })
        })
      })
    })
  }

  rechazarAutorizacion(id:number){
    if(this.informacionModal[1] == 1){
      this.idContable += this.informacionModal[1]+1
    }else{
      this.idContable += this.informacionModal[1]+1
    }
    console.log(this.idContable)
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(id).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(83).subscribe(resEstado=>{
        this.servicioEstado.listarPorId(81).subscribe(resEstadoAprobado=>{
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
            let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
            let solicitudBajaActivoMod : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
            activoBaja.id = resActivoBaja.id
            console.log(this.idContable, lengthActivos)
            if(this.idContable == lengthActivos){
              document.getElementById('snipper07')?.setAttribute('style', 'display: block;')
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.servicioArticulosBaja.listarTodos().subscribe(resActivosBajaCompletos=>{
                  resActivosBajaCompletos.forEach(activoBaja => {
                    if(activoBaja.idSolicitudBaja.id == this.informacionModal[0]){
                      if(activoBaja.idEstado.id == 81){
                        this.aceptado = true
                      }else{
                        this.aceptado = false
                      }
                      this.listaAceptado.push(this.aceptado)
                    }
                  });
                  const existeAprobado = this.listaAceptado.includes(true)
                  console.log(existeAprobado)
                  if(existeAprobado == true){
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstadoAprobado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = resUsuarioLogueado.id
                      solicitudBajaActivoMod.usuario_confirmacion = 0
                      this.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                    })
                  }else if(existeAprobado == false){
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = 0
                      solicitudBajaActivoMod.usuario_confirmacion = 0
                      console.log(solicitudBajaActivoMod)
                      this.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                    })
                  }
                })
              })
            }else{
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              console.log(activoBaja)
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.dialogRef.close();
                const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
                  width: '800px',
                  height: '440px',
                  data: {idSolicitudBaja: activoBaja.id_solicitud_baja, idContable: this.idContable}
                });
              })
            }
          })
        })
      })
    })
    console.log(this.idContable)
  }

  correo: any;
  contrasena: any;
  public actualizarSolicitudBajaArticulo(solicitudBajaActivo: SolicitudBajasArticulos2){
    console.log(solicitudBajaActivo)
    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaActivo).subscribe(resSolicitudBajaActivo=>{
      if(solicitudBajaActivo.id_estado == 83){
        let correo : Correo = new Correo();
        this.servicioSolicitudBajaActivo.listarPorId(Number(this.informacionModal[0])).subscribe(resSolicitudBajaActio=>{
          this.servicioArticulosBaja.listarTodos().subscribe(resBajasActivos=>{
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
              correo.to = resSolicitudBajaActio.idUsuario.correo
              correo.subject = "Rechazo de solicitud Baja Activo"
              correo.messaje = "<!doctype html>"
              +"<html>"
                +"<head>"
                +"<meta charset='utf-8'>"
                +"</head>"
                +"<body>"
                +"<h3 style='color: black;'>Su solicitud para dar de baja algunos activos, ha sido rechazada por compras.</h3>"
                +"<br>"
                +"<table style='border: 1px solid #000; text-align: center;'>"
                +"<tr>"
                +"<th style='border: 1px solid #000;'>Activo</th>"
                +"<th style='border: 1px solid #000;'>Serial</th>"
                +"<th style='border: 1px solid #000;'>Placa</th>"
                +"<th style='border: 1px solid #000;'>Marca</th>"
                +"<th style='border: 1px solid #000;'>Estado</th>"
                +"<th style='border: 1px solid #000;'>Observacion</th>";
                +"</tr>";
                resBajasActivos.forEach(element => {
                  if (element.idSolicitudBaja.id == Number(this.informacionModal[0])) {
                    correo.messaje += "<tr>"
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.idArticulo.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.serial+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.placa+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.marca+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idOpcionBaja.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
                    correo.messaje += "</tr>";
                  }
                });
                correo.messaje += "</table>"
                +"<br>"
                +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
                +"</body>"
                +"</html>";
              this.enviarCorreo(correo, resSolicitudBajaActio);
            })
          })
        })
      }else if(solicitudBajaActivo.id_estado == 81){
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se aprobo correctamente la solicitud!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }
    })
  }

  public enviarCorreo(correo: Correo, resSolicitudActivoBaja){
    if(resSolicitudActivoBaja.idEstado.id == 83){
      this.servicioCorreo.enviar(correo).subscribe(res =>{
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se rechazo correctamente la solicitud de baja activo!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }, error => {
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al enviar el Correo!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }else if(resSolicitudActivoBaja.idEstado.id == 82){
      this.servicioCorreo.enviar(correo).subscribe(res =>{
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se aprobo correctamente la solicitud de baja activo!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }, error => {
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al enviar el Correo!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }else if(resSolicitudActivoBaja.idEstado.id == 84){
      this.servicioCorreo.enviar(correo).subscribe(res =>{
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se rechazo correctamente la solicitud de baja activo!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }, error => {
        document.getElementById('snipper07')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al enviar el Correo!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
  }

  aceptado2: boolean = false;
  listaAceptado2: any = [];
  public aceptarConfirmacion(idSolicitudBajaActivo){
    if(this.informacionModal[1] == 1){
      this.idContable += this.informacionModal[1]+1
    }else{
      this.idContable += this.informacionModal[1]+1
    }
    console.log(this.idContable)
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(idSolicitudBajaActivo).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(82).subscribe(resEstado=>{
        this.servicioEstado.listarPorId(84).subscribe(resEstadoRechazado=>{
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
            let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
            let solicitudBajaActivoMod : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
            activoBaja.id = resActivoBaja.id
            console.log(this.idContable)
            console.log(this.listaActivosBaja)
            if(this.idContable == lengthActivos){
              console.log("wenas")
              document.getElementById('snipper07')?.setAttribute('style', 'display: block;')
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.servicioArticulosBaja.listarTodos().subscribe(resActivosBajaCompletos=>{
                  resActivosBajaCompletos.forEach(activoBaja => {
                    if(activoBaja.idSolicitudBaja.id == this.informacionModal[0]){
                      console.log(activoBaja)
                      if(activoBaja.idEstado.id == 82){
                        this.aceptado2 = true
                      }else{
                        this.aceptado2 = false
                      }
                      this.listaAceptado2.push(this.aceptado2)
                    }
                  });
                  const existeAprobado = this.listaAceptado2.includes(true)
                  if(existeAprobado == true){
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = resSolicitudActivoBaja.usuarioAutorizacion
                      solicitudBajaActivoMod.usuario_confirmacion = resUsuarioLogueado.id
                      this.actualizarSolicitudBajaArticuloAutorizada(solicitudBajaActivoMod)
                    })
                  }else{
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstadoRechazado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = resSolicitudActivoBaja.usuarioAutorizacion
                      solicitudBajaActivoMod.usuario_confirmacion = 0
                      this.actualizarSolicitudBajaArticuloAutorizada(solicitudBajaActivoMod)
                    })
                  }
                })
              })
            }else{
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              console.log(activoBaja)
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.dialogRef.close();
                const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
                  width: '800px',
                  height: '440px',
                  data: {idSolicitudBaja: activoBaja.id_solicitud_baja, idContable: this.idContable}
                });
              })
            }
          })
        })
      })
    })
  }

  correo2: any;
  contrasena2: any;
  public actualizarSolicitudBajaArticuloAutorizada(solicitudBajaActivo: SolicitudBajasArticulos2){
    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaActivo).subscribe(resSolicitudBajaActivo=>{
      if(solicitudBajaActivo.id_estado == 84){
        let correo : Correo = new Correo();
        this.servicioSolicitudBajaActivo.listarPorId(Number(this.informacionModal[0])).subscribe(resSolicitudBajaActio=>{
          this.servicioArticulosBaja.listarTodos().subscribe(resBajasActivos=>{
            this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
              resConfiguracion.forEach(elementConfi => {
                if(elementConfi.nombre == "correo_gecco"){
                  this.correo2 = elementConfi.valor
                }
                if(elementConfi.nombre == "contraseña_correo"){
                  this.contrasena2 = elementConfi.valor
                }
              });

              correo.correo = this.correo2
              correo.contrasena = this.contrasena2
              correo.to = resSolicitudBajaActio.idUsuario.correo
              correo.subject = "Rechazo de solicitud Baja Activo"
              correo.messaje = "<!doctype html>"
              +"<html>"
                +"<head>"
                +"<meta charset='utf-8'>"
                +"</head>"
                +"<body>"
                +"<h3 style='color: black;'>Su solicitud para dar de baja algunos activos, ha sido rechazada por compras o control interno.</h3>"
                +"<br>"
                +"<table style='border: 1px solid #000; text-align: center;'>"
                +"<tr>"
                +"<th style='border: 1px solid #000;'>Activo</th>"
                +"<th style='border: 1px solid #000;'>Serial</th>"
                +"<th style='border: 1px solid #000;'>Placa</th>"
                +"<th style='border: 1px solid #000;'>Marca</th>"
                +"<th style='border: 1px solid #000;'>Estado</th>"
                +"<th style='border: 1px solid #000;'>Observacion</th>"
                +"<th style='border: 1px solid #000;'>Rechazado</th>"
                +"</tr>";
                resBajasActivos.forEach(element => {
                  if (element.idSolicitudBaja.id == Number(this.informacionModal[0])){
                    correo.messaje += "<tr>"
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.idArticulo.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.serial+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.placa+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.marca+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idOpcionBaja.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
                    if(element.idEstado.id == 83){
                      correo.messaje += "<td style='border: 1px solid #000;'>Fue rechazado por parte de compras.</td>";
                    }else if(element.idEstado.id == 84){
                      correo.messaje += "<td style='border: 1px solid #000;'>Fue rechazado por parte de control interno.</td>";
                    }
                    correo.messaje += "</tr>";
                  }
                });
                correo.messaje += "</table>"
                +"<br>"
                +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
                +"</body>"
                +"</html>";
              this.enviarCorreo(correo, resSolicitudBajaActio);
            })
          })
        })
      }else if(solicitudBajaActivo.id_estado == 82){
        let correo : Correo = new Correo();
        this.servicioSolicitudBajaActivo.listarPorId(Number(this.informacionModal[0])).subscribe(resSolicitudBajaActio=>{
          this.servicioArticulosBaja.listarTodos().subscribe(resBajasActivos=>{
            this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
              resConfiguracion.forEach(elementConfi => {
                if(elementConfi.nombre == "correo_gecco"){
                  this.correo2 = elementConfi.valor
                }
                if(elementConfi.nombre == "contraseña_correo"){
                  this.contrasena2 = elementConfi.valor
                }
              });

              correo.correo = this.correo2
              correo.contrasena = this.contrasena2
              correo.to = resSolicitudBajaActio.idUsuario.correo
              correo.subject = "Aprobación de solicitud Baja Activo"
              correo.messaje = "<!doctype html>"
              +"<html>"
                +"<head>"
                +"<meta charset='utf-8'>"
                +"</head>"
                +"<body>"
                +"<h3 style='color: black;'>Su solicitud para dar de baja algunos activos, ha sido aprobada por compras y control interno.</h3>"
                +"<br>"
                +"<table style='border: 1px solid #000; text-align: center;'>"
                +"<tr>"
                +"<th style='border: 1px solid #000;'>Activo</th>"
                +"<th style='border: 1px solid #000;'>Serial</th>"
                +"<th style='border: 1px solid #000;'>Placa</th>"
                +"<th style='border: 1px solid #000;'>Marca</th>"
                +"<th style='border: 1px solid #000;'>Estado</th>"
                +"<th style='border: 1px solid #000;'>Observacion</th>";
                +"<th style='border: 1px solid #000;'>Aprobado o Rechazado</th>";
                +"</tr>";
                resBajasActivos.forEach(element => {
                  if (element.idSolicitudBaja.id == Number(this.informacionModal[0])) {
                    correo.messaje += "<tr>"
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.idArticulo.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.serial+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.placa+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idDetalleArticulo.marca+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.idOpcionBaja.descripcion+"</td>";
                    correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
                    if(element.idEstado.id == 82){
                      correo.messaje += "<td style='border: 1px solid #000;'>Fue aprobado por parte de compras y control interno.</td>";
                    }else if(element.idEstado.id == 83){
                      correo.messaje += "<td style='border: 1px solid #000;'>Fue rechazado por parte de compras.</td>";
                    }else if(element.idEstado.id == 84){
                      correo.messaje += "<td style='border: 1px solid #000;'>Fue rechazado por parte de control interno.</td>";
                    }
                    correo.messaje += "</tr>";
                  }
                });
                correo.messaje += "</table>"
                +"<br>"
                +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
                +"</body>"
                +"</html>";
              this.enviarCorreo(correo, resSolicitudBajaActio);
            })
          })
        })
      }
    })
  }

  public rechazarConfirmacion(idSolicitudBajaActivo){
    if(this.informacionModal[1] == 1){
      this.idContable += this.informacionModal[1]+1
    }else{
      this.idContable += this.informacionModal[1]+1
    }
    console.log(this.idContable)
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(idSolicitudBajaActivo).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(84).subscribe(resEstado=>{
        this.servicioEstado.listarPorId(82).subscribe(resEstadoAprobado=>{
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
            let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
            let solicitudBajaActivoMod : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
            activoBaja.id = resActivoBaja.id
            console.log(this.idContable)
            if(this.idContable == lengthActivos){
              document.getElementById('snipper07')?.setAttribute('style', 'display: block;')
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.servicioArticulosBaja.listarTodos().subscribe(resActivosBajaCompletos=>{
                  resActivosBajaCompletos.forEach(activoBaja => {
                    if(activoBaja.idSolicitudBaja.id == this.informacionModal[0]){
                      if(activoBaja.idEstado.id == 82){
                        this.aceptado = true
                      }else{
                        this.aceptado = false
                      }
                      this.listaAceptado.push(this.aceptado)
                    }
                  });
                  const existeAprobado = this.listaAceptado.includes(true)
                  console.log(existeAprobado)
                  if(existeAprobado == true){
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstadoAprobado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = resUsuarioLogueado.id
                      solicitudBajaActivoMod.usuario_confirmacion = resUsuarioLogueado.id
                      this.actualizarSolicitudBajaArticuloAutorizada(solicitudBajaActivoMod)
                    })
                  }else if(existeAprobado == false){
                    this.servicioSolicitudBajaActivo.listarPorId(this.informacionModal[0]).subscribe(resSolicitudActivoBaja=>{
                      solicitudBajaActivoMod.id = resSolicitudActivoBaja.id
                      solicitudBajaActivoMod.fecha = resSolicitudActivoBaja.fecha
                      solicitudBajaActivoMod.id_estado = resEstado.id
                      solicitudBajaActivoMod.id_usuario = resSolicitudActivoBaja.idUsuario.id
                      solicitudBajaActivoMod.usuario_autorizacion = resSolicitudActivoBaja.usuarioAutorizacion
                      solicitudBajaActivoMod.usuario_confirmacion = 0
                      console.log(solicitudBajaActivoMod)
                      this.actualizarSolicitudBajaArticuloAutorizada(solicitudBajaActivoMod)
                    })
                  }
                })
              })
            }else{
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              console.log(activoBaja)
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.dialogRef.close();
                const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
                  width: '800px',
                  height: '440px',
                  data: {idSolicitudBaja: activoBaja.id_solicitud_baja, idContable: this.idContable}
                });
              })
            }
          })
        })
      })
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaActivosBaja);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: ArticulosBaja, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  name = 'listaActivosBajasSolicitud.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('activosBajasSolicitud');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
