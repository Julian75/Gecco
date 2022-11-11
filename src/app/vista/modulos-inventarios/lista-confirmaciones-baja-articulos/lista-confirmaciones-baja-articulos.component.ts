import { Articulo2 } from './../../../modelos/articulo2';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { RechazoSolicitudBajaArticuloLiderProcesoComponent } from './rechazo-solicitud-baja-articulo-lider-proceso/rechazo-solicitud-baja-articulo-lider-proceso.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { SolicitudBajasArticulos2 } from 'src/app/modelos/modelos2/solicitudBajasArticulos2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { VisualizarActivosBajasSolicitudComponent } from '../visualizar-activos-bajas-solicitud/visualizar-activos-bajas-solicitud.component';
import { Correo } from 'src/app/modelos/correo';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { ActasBaja } from 'src/app/modelos/actasBaja';
import { ActasBajaService } from 'src/app/servicios/actasBaja.service';
import { SolicitudBajasArticulos } from 'src/app/modelos/solicitudBajasArticulos';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-confirmaciones-baja-articulos',
  templateUrl: './lista-confirmaciones-baja-articulos.component.html',
  styleUrls: ['./lista-confirmaciones-baja-articulos.component.css']
})
export class ListaConfirmacionesBajaArticulosComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'usuario','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceModificar: ModificarService,
    private serviceEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioArticulo: ArticuloService,
    public servicioBajaArticulos: ArticulosBajaService,
    public servicioConfiguracion: ConfiguracionService,
    public servicioCorreo: CorreoService,
    private servicioActasBajas: ActasBajaService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    localStorage.setItem('listaAutorizacionUbicacion', 'false')
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 81){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  correo: any;
  contrasena: any;
  aceptarConfirmacion( id:number){
    document.getElementById('snipper03')?.setAttribute('style', 'display: block;')
    let solicitudBaja = new SolicitudBajasArticulos2();
    this.serviceSolicitudBajasArticulos.listarPorId(id).subscribe(res=>{
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        this.serviceEstado.listarPorId(82).subscribe(resEstado=>{
          solicitudBaja.id = res.id;
          var fecha = new Date(res.fecha)
          fecha.setDate(fecha.getDate()+1)
          solicitudBaja.fecha = fecha;
          solicitudBaja.id_usuario = res.idUsuario.id;
          solicitudBaja.id_estado = resEstado.id;
          solicitudBaja.usuario_autorizacion = res.usuarioAutorizacion
          solicitudBaja.usuario_confirmacion = resUsuario.id
          this.serviceModificar.actualizarSolicitudBajaArticulo(solicitudBaja).subscribe(resSolicitudBajaArticulo=>{
            let correo : Correo = new Correo();
            this.servicioBajaArticulos.listarTodos().subscribe(resBajasActivos=>{
              this.servicioUsuario.listarPorId(res.idUsuario.id).subscribe(resUsuario =>{
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
                  correo.to = resUsuario.correo
                  correo.subject = "Aprobación de solicitud"
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
                    +"</tr>";
                    resBajasActivos.forEach(element => {
                      if (element.idSolicitudBaja.id == res.id) {
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
                  this.enviarCorreo(correo, solicitudBaja.id);
                })
              })
            })
          })
        })
      })
    })
  }

  public enviarCorreo(correo: Correo, idSolicitudBajaActivo){
    let actasBajas = new ActasBaja();
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      this.serviceSolicitudBajasArticulos.listarPorId(idSolicitudBajaActivo).subscribe(resSolicitudBajas=>{
          actasBajas.idSolicitudBajaArticulos = resSolicitudBajas
          actasBajas.fecha = new Date()
          var min = 1
          var max = 100000000
          var numero = Math.floor(Math.random()*(min+max)+min);
          actasBajas.codigoUnico = String((numero*resSolicitudBajas.id)+""+resSolicitudBajas.id)
          this.servicioActasBajas.registrar(actasBajas).subscribe(regisActasBajas =>{
            document.getElementById('snipper03')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se aprobo correctamente la solciitud!',
              showConfirmButton: false,
              timer: 1500
            })
            window.location.reload();
          })
      })
    }, error => {
      document.getElementById('snipper03')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al enviar el Correo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  visualizarActivosBajas(id:number){
    const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
      width: '800px',
      height: '440px',
      data: {idSolicitudBaja: id, idContable: 0}
    });
  }

  rechazarConfirmacion(id:number){
    const dialogRef = this.dialog.open(RechazoSolicitudBajaArticuloLiderProcesoComponent, {
      width: '500px',
      height: '300px',
      data: id
    });
  }
  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: SolicitudBajasArticulos, filter: string) => {
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

  listSolicitudesBajaAutorizar: any = []; // Es una lista para poder pasarle directamente al formato excel
  usuarioAutorizacion: any = [];
  exportToExcel(): void {
    this.servicioUsuario.listarTodos().subscribe(resUsuarios=>{
      this.listSolicitudesBajaAutorizar = []
      this.usuarioAutorizacion
      for (let index = 0; index < this.listarSolicitudesBajas.length; index++) {
        const element = this.listarSolicitudesBajas[index];
        resUsuarios.forEach(elementUsuario => {
          if(elementUsuario.id == element.usuarioAutorizacion){
            this.usuarioAutorizacion = elementUsuario
          }
        });
        var obj = {
          "Id": element.id,
          "Fecha": element.fecha,
          "Usuario Solicito": element.idUsuario.nombre+" "+element.idUsuario.apellido,
          "Usuario Autorizo": this.usuarioAutorizacion.nombre+" "+this.usuarioAutorizacion.apellido,
          "Estado Solicitud": element.idEstado.descripcion
        }
        this.listSolicitudesBajaAutorizar.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listSolicitudesBajaAutorizar);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaSolicitudesBajasActivos");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
