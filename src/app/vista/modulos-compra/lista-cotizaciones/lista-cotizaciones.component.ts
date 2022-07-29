import { PasosComponent } from './../pasos/pasos.component';
import { CotizacionPdf } from './../../../modelos/cotizacionPdf';
import { CotizacionPdfService } from './../../../servicios/cotizacionPdf.service';
import { SubirPdfService } from './../../../servicios/subirPdf.service';
import { Observable } from 'rxjs';
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
  public listaCotizacionesPdf: any = [];
  public listaDetalleSolicitud: any = [];
  public listaPdf:any = []

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
    private servicioCotizacionPdf: CotizacionPdfService,
    private servicioPdf: SubirPdfService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<ListaCotizacionesComponent>,
    public dialogRef2: MatDialogRef<PasosComponent>,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.servicioCotizacion.listarTodos().subscribe(res => {
      res.forEach(elementCotizacion => {
        if (elementCotizacion.idSolicitud.id == Number(this.data)) {
         this.listaCotizaciones.push(elementCotizacion);
        }
      })
      this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacionPdf => {
        resCotizacionPdf.forEach(elementCotizacionPdf => {
          if(elementCotizacionPdf.idCotizacion.idSolicitud.id == this.listaCotizaciones[0].idSolicitud.id && elementCotizacionPdf.idCotizacion.idEstado.id == 31 ){
            this.listaCotizacionesPdf.push(elementCotizacionPdf)
          }
        });
        this.dataSource = new MatTableDataSource(this.listaCotizacionesPdf);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }


  //Abrir Modal de detalle Solicitud p mano XD
  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      data: {id: id}
    });
  }

  //Aceptacion de cotizacion Pdf
  public aceptar(idSolicitud:number, idCotizacion:number, idCotizacionPdf:number){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
    this.servicioCotizacionPdf.listarPorId(idCotizacionPdf).subscribe(resCotizacionPdf=>{
      cotizacionPdf.id = resCotizacionPdf.id
      cotizacionPdf.nombrePdf = resCotizacionPdf.nombrePdf
      cotizacionPdf.idCotizacion = resCotizacionPdf.idCotizacion
      this.servicioEstado.listarPorId(39).subscribe(resEsta=>{
        cotizacionPdf.idEstado = resEsta
        this.actualizaCotizacionPdf(cotizacionPdf, idCotizacion);
        console.log(cotizacionPdf)
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
      })
    })

  }

  public actualizaCotizacionPdf(cotizaciPdf: CotizacionPdf, idCotizacion: number){
    this.servicioCotizacionPdf.actualizar(cotizaciPdf).subscribe(res=>{
      let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
      this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacion=>{
        resCotizacion.forEach(element => {
          if(element.idCotizacion.id == idCotizacion && element.idEstado.id == 38){
            cotizacionPdf.id = element.id
            cotizacionPdf.nombrePdf = element.nombrePdf
            cotizacionPdf.idCotizacion = element.idCotizacion
            this.servicioEstado.listarPorId(40).subscribe(resEstado=>{
              cotizacionPdf.idEstado = resEstado
              console.log(cotizacionPdf)
              this.actualizaCotizacionPdf2(cotizacionPdf);
            })
          }
        });
      })
    })
  }

  public actualizaCotizacionPdf2(cotizacionPdf: CotizacionPdf){
    this.servicioCotizacionPdf.actualizar(cotizacionPdf).subscribe(res=>{})
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
        correo.subject = "Aceptación de Cotización"
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
        correo.subject = "Aceptación de Cotización"
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>La cotización ha sido aprobada.</h3>"
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
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha enviado un correo informando su aceptación al lider del proceso y quien genero la cotización.',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
      this.dialogRef.close();
      this.dialogRef2.close();
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

  //Rechazo de cotizacion Pdf

  public rechazarSolicitud(cotizaPdf:any){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.servicioCotizacionPdf.listarPorId(cotizaPdf.id).subscribe(resCotizacionPdf=>{
      let cotizacionPdf : CotizacionPdf = new CotizacionPdf();
      cotizacionPdf.id = resCotizacionPdf.id
      cotizacionPdf.idCotizacion = resCotizacionPdf.idCotizacion
      cotizacionPdf.nombrePdf = resCotizacionPdf.nombrePdf
      this.servicioEstado.listarPorId(40).subscribe(resEstado=>{
        cotizacionPdf.idEstado = resEstado
        this.actualizarCotizacionPdf(cotizacionPdf, cotizaPdf);
      })
    })
  }

  public actualizarCotizacionPdf(cotizacionPdf: CotizacionPdf, cotizaPdf:any){
    this.listaCotizacionesPdf = []
    this.servicioCotizacionPdf.actualizar(cotizacionPdf).subscribe(res=>{
      this.servicioCotizacionPdf.listarTodos().subscribe(resPdf=>{
        resPdf.forEach(element => {
          if(element.idCotizacion.id == cotizaPdf.idCotizacion.id && element.idCotizacion.idEstado.id == 31){
            this.listaCotizacionesPdf.push(element)
          }
        });
        console.log(this.listaCotizacionesPdf)
        var contador = 0
        for (let i = 0; i < this.listaCotizacionesPdf.length; i++) {
          const element = this.listaCotizacionesPdf[i];
          if(element.idEstado.id == 40){
            contador += 1
            console.log(contador)
            if(contador == this.listaCotizacionesPdf.length){
              console.log("hola")
              let solicitud : Solicitud = new Solicitud();
              this.servicioSolicitud.listarPorId(cotizaPdf.idCotizacion.idSolicitud.id).subscribe(resSolicitud=>{
                solicitud.id = resSolicitud.id
                solicitud.fecha = resSolicitud.fecha
                solicitud.idUsuario = resSolicitud.idUsuario
                this.servicioEstado.listarPorId(35).subscribe(resEstado=>{
                  solicitud.idEstado = resEstado
                  this.actualizarEstado(solicitud, cotizaPdf);
                })
              })
            }else{
              this.dialogRef.close();
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              const dialogRef = this.dialog.open(ListaCotizacionesComponent, {
                width: '1000px',
                height: '430px',
                data: cotizaPdf.idCotizacion.idSolicitud.id
              });
            }
          }
        }
      })
    })
  }

  public actualizarEstado(solicitud: Solicitud, cotizaPdf:any){
    this.servicioSolicitud.actualizar(solicitud).subscribe(res=>{
      let cotizacion : Cotizacion = new Cotizacion();
      this.servicioCotizacion.listarPorId(cotizaPdf.idCotizacion.id).subscribe(resCotizacion=>{
        cotizacion.id = resCotizacion.id
        cotizacion.idSolicitud = resCotizacion.idSolicitud
        cotizacion.idUsuario = resCotizacion.idUsuario
        this.servicioEstado.listarPorId(32).subscribe(resEstado=>{
          cotizacion.idEstado = resEstado
          this.actualizarCotizacion2(cotizacion);
        })
      })
    })
  }

  public actualizarCotizacion2(cotizacion:Cotizacion){
    this.servicioCotizacion.actualizar(cotizacion).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha rechazado todas las cotizaciones',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al rechazar las cotizaciones!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  //Descargar Cotizacion Individualmente
  public descargarPdf(id: number){
    this.servicioCotizacionPdf.listarPorId(id).subscribe(res=>{
      console.log(res.nombrePdf)
      this.servicioPdf.listarTodos().subscribe(resPdf => {
        this.listaPdf.push(resPdf)
        console.log(resPdf)
        for(const i in resPdf){
          console.log(this.listaPdf[0][i].name)
          if (res.nombrePdf == this.listaPdf[0][i].name) {
            console.log(this.listaPdf[0][i])
            window.location.href = this.listaPdf[0][i].url
          }
        }
      })
    })
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
