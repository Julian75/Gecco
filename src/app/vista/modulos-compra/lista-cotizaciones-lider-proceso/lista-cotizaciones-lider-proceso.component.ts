import { ListaCotizacionesComponent } from './../lista-cotizaciones/lista-cotizaciones.component';
import { ConfiguracionService } from './../../../servicios/configuracion.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { PasosComponent } from './../pasos/pasos.component';
import { CotizacionPdfService } from './../../../servicios/cotizacionPdf.service';
import { SubirPdfService } from './../../../servicios/subirPdf.service';
import { CotizacionService } from './../../../servicios/cotizacion.service';
import { Correo } from './../../../modelos/correo';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { CorreoService } from './../../../servicios/Correo.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { EstadoService } from './../../../servicios/estado.service';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CotizacionPdf2 } from 'src/app/modelos/cotizacionPdf2';
import { Solicitud2 } from 'src/app/modelos/solicitud2';
import { Cotizacion2 } from 'src/app/modelos/cotizacion2';

@Component({
  selector: 'app-lista-cotizaciones-lider-proceso',
  templateUrl: './lista-cotizaciones-lider-proceso.component.html',
  styleUrls: ['./lista-cotizaciones-lider-proceso.component.css']
})
export class ListaCotizacionesLiderProcesoComponent implements OnInit {
  public listaCotizaciones: any = [];
  public listaCotizacionesPdf: any = [];
  public listaDetalleSolicitud: any = [];
  public listaPdf:any = []
  public correo:any
  public contrasena:any
  public fecha: Date = new Date();

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
    private servicioConfiguracion: ConfiguracionService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<ListaCotizacionesLiderProcesoComponent>,
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
    let solicitud : Solicitud2 = new Solicitud2();
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud => {
      this.servicioEstado.listarPorId(36).subscribe(resEstado => {
        solicitud.id = resSolicitud.id
        this.fecha = new Date(resSolicitud.fecha)
        this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
        solicitud.fecha = this.fecha
        solicitud.idUsuario = resSolicitud.idUsuario.id
        solicitud.idEstado = resEstado.id
        this.actualizarSolicitud(solicitud);
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(res =>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Acepto una cotización del lider del proceso',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload()
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

  //Rechazo de cotizacion Pdf

  public rechazarSolicitud(cotizaPdf:any){
    this.dialogRef.close();
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.servicioCotizacionPdf.listarPorId(cotizaPdf.id).subscribe(resCotizacionPdf=>{
      let cotizacionPdf : CotizacionPdf2 = new CotizacionPdf2();
      cotizacionPdf.id = resCotizacionPdf.id
      cotizacionPdf.idCotizacion = resCotizacionPdf.idCotizacion.id
      cotizacionPdf.nombrePdf = resCotizacionPdf.nombrePdf
      this.servicioEstado.listarPorId(40).subscribe(resEstado=>{
        cotizacionPdf.idEstado = resEstado.id
        this.actualizarCotizacionPdf(cotizacionPdf, cotizaPdf);
      })
    })
  }

  public actualizarCotizacionPdf(cotizacionPdf: CotizacionPdf2, cotizaPdf:any){
    this.listaCotizacionesPdf = []
    this.servicioModificar.actualizarCotizacionPdf(cotizacionPdf).subscribe(res=>{
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
              let solicitud : Solicitud2 = new Solicitud2();
              this.servicioSolicitud.listarPorId(cotizaPdf.idCotizacion.idSolicitud.id).subscribe(resSolicitud=>{
                solicitud.id = resSolicitud.id
                this.fecha = new Date(resSolicitud.fecha)
                this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
                solicitud.fecha = this.fecha
                solicitud.idUsuario = resSolicitud.idUsuario.id
                this.servicioEstado.listarPorId(29).subscribe(resEstado=>{
                  solicitud.idEstado = resEstado.id
                  this.actualizarEstado(solicitud, cotizaPdf);
                })
              })
            }else{
              this.dialogRef.close();
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              const dialogRef = this.dialog.open(ListaCotizacionesLiderProcesoComponent, {
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

  public actualizarEstado(solicitud: Solicitud2, cotizaPdf:any){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(res=>{
      let cotizacion : Cotizacion2 = new Cotizacion2();
      this.servicioCotizacion.listarPorId(cotizaPdf.idCotizacion.id).subscribe(resCotizacion=>{
        cotizacion.id = resCotizacion.id
        cotizacion.idSolicitud = resCotizacion.idSolicitud.id
        cotizacion.idUsuario = resCotizacion.idUsuario.id
        this.servicioEstado.listarPorId(32).subscribe(resEstado=>{
          cotizacion.idEstado = resEstado.id
          this.actualizarCotizacion2(cotizacion);
        })
      })
    })
  }

  public actualizarCotizacion2(cotizacion:Cotizacion2){
    this.servicioModificar.actualizarCotizacion(cotizacion).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha rechazado todas las cotizaciones del lider del proceso',
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
          console.log(this.listaPdf)
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
