import { SubirPdfService } from './../../../servicios/subirPdf.service';
import { Observable } from 'rxjs';
import { RechazoCotizacionComponent } from './rechazo-cotizacion/rechazo-cotizacion.component';
import { Cotizacion } from './../../../modelos/cotizacion';
import { CotizacionService } from './../../../servicios/cotizacion.service';
import { Correo } from './../../../modelos/correo';
import { Solicitud } from './../../../modelos/solicitud';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { CorreoService } from './../../../servicios/Correo.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { EstadoService } from './../../../servicios/estado.service';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.css']
})
export class ListaCotizacionesComponent implements OnInit {
  public listaCotizaciones: any = [];
  public listaDetalleSolicitud: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioCotizacion: CotizacionService,
    private servicioSolicitud: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<ListaCotizacionesComponent>,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.servicioCotizacion.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.idSolicitud.id == Number(this.data)) {
         this.listaCotizaciones.push(element);
        }
      })
      console.log(this.listaCotizaciones)
      this.dataSource = new MatTableDataSource(this.listaCotizaciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      data: {id: id}
    });
  }

  public aceptar(idSolicitud:number, idCotizacion:number){
    let solicitud : Solicitud = new Solicitud();
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud => {
      this.servicioEstado.listarPorId(34).subscribe(resEstado => {
        solicitud.id = resSolicitud.id
        solicitud.fecha = resSolicitud.fecha
        solicitud.idUsuario = resSolicitud.idUsuario
        solicitud.idEstado = resEstado
        this.actualizarSolicitud(solicitud, idCotizacion);
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud, idCotizacion:number){
    this.servicioSolicitud.actualizar(solicitud).subscribe(res =>{
      this.actualCotizacion(idCotizacion, solicitud.idUsuario.id, solicitud.id )
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public actualCotizacion(idCotizacion:number, idUsuarioSolicitud:number, idSolicitud:number){
    let cotizacion : Cotizacion = new Cotizacion();
      this.servicioCotizacion.listarPorId(idCotizacion).subscribe(resCotizacion => {
        this.servicioEstado.listarPorId(33).subscribe(resEstado => {
          cotizacion.id = resCotizacion.id
          cotizacion.idSolicitud = resCotizacion.idSolicitud
          cotizacion.idUsuario = resCotizacion.idUsuario
          cotizacion.idEstado = resEstado
          this.actualizarCotizacion(cotizacion, cotizacion.idUsuario.id, idUsuarioSolicitud, idSolicitud);
        })
      })
  }

  public actualizarCotizacion(cotizacion: Cotizacion, idUsuarioCotizacion:number, idUsuarioSolicitud:number, idSolicitud:number){
    this.servicioCotizacion.actualizar(cotizacion).subscribe(res =>{
      this.crearCorreo(idUsuarioCotizacion, idUsuarioSolicitud, idSolicitud)
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar cotización!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public crearCorreo(idUsuarioCotizacion:number, idUsuarioSolicitud: number, idSolicitud:number){
    let correo : Correo = new Correo();
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuarioCotizacion).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Aceptacion de Cotización"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su cotización ha sido aprobada.</h3>"
        +"<br>"
        +"<table style='border: 1px solid #000; text-align: center;'>"
        +"<tr>"
        +"<th style='border: 1px solid #000;'>Articulo</th>"
        +"<th style='border: 1px solid #000;'>Cantidad</th>"
        +"<th style='border: 1px solid #000;'>Observacion</th>";
        +"</tr>";
        resSolicitud.forEach(element => {
          if (element.idSolicitud.id == idSolicitud) {
            this.listaDetalleSolicitud.push(element)
            correo.messaje += "<tr>"
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
            correo.messaje += "</tr>";
          }
        });
        correo.messaje += "</table>"
        +"<br>"
        +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
        +"</body>"
        +"</html>";

        this.enviarCorreo(correo, idUsuarioSolicitud, idSolicitud);
      })
    })
  }

  public enviarCorreo(correo: Correo, idUsuarioSolicitud: number, idSolicitud:number){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      this.crearCorreo2(idUsuarioSolicitud, idSolicitud)
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al enviar el Correo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public crearCorreo2(idUsuarioSolicitud: number, idSolicitud:number){
    let correo : Correo = new Correo();
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
      this.servicioUsuario.listarPorId(idUsuarioSolicitud).subscribe(resUsuario => {
        correo.to = resUsuario.correo
        correo.subject = "Aceptacion de Cotización"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Su cotización ha sido aprobada.</h3>"
        +"<br>"
        +"<table style='border: 1px solid #000; text-align: center;'>"
        +"<tr>"
        +"<th style='border: 1px solid #000;'>Articulo</th>"
        +"<th style='border: 1px solid #000;'>Cantidad</th>"
        +"<th style='border: 1px solid #000;'>Observacion</th>";
        +"</tr>";
        resSolicitud.forEach(element => {
          if (element.idSolicitud.id == idSolicitud) {
            this.listaDetalleSolicitud.push(element)
            correo.messaje += "<tr>"
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
            correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
            correo.messaje += "</tr>";
          }
        });
        correo.messaje += "</table>"
        +"<br>"
        +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
        +"</body>"
        +"</html>";

        this.enviarCorreo2(correo);
      })
    })
  }

  public enviarCorreo2(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha enviado un correo informando su aceptación al lider del proceso y quien genero la cotización.',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al enviar el Correo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }


  rechazarSolicitud(id: number){
    const dialogRef = this.dialog.open(RechazoCotizacionComponent, {
      width: '500px',
      data: id
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaSolicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  public volver(){
    this.dialogRef.close();
  }

}
