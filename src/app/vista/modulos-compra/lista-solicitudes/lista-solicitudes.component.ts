import { CotizacionService } from './../../../servicios/cotizacion.service';
import { SubirPdfService } from './../../../servicios/subirPdf.service';
import { CotizacionPdfService } from './../../../servicios/cotizacionPdf.service';
import { OrdenCompraService } from './../../../servicios/ordenCompra.service';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Correo } from './../../../modelos/correo';
import { CorreoService } from './../../../servicios/Correo.service';
import { EstadoService } from './../../../servicios/estado.service';
import { Solicitud } from './../../../modelos/solicitud';
import { Component, OnInit,ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { VisualizarDetalleSolicitudComponent } from './visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { RechazoSolicitudComponent } from './rechazo-solicitud/rechazo-solicitud.component';
import { PasosComponent } from '../pasos/pasos.component';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import { Solicitud2 } from 'src/app/modelos/solicitud2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];
  public habilitar: any = false;
  public fecha: Date = new Date();
  public listaPdf: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioCorreo: CorreoService,
    private servicioAccesos: AccesoService,
    private servicioArticulos: ArticuloService,
    private servicioModificar: ModificarService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioOrdenCompra: OrdenCompraService,
    private servicioCotizacion: CotizacionService,
    private servicioCotizacionPdf: CotizacionPdfService,
    private servicioPdf: SubirPdfService,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 24 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        })
        if(this.habilitar == true){
          this.solicitudService.listarTodos().subscribe(res => {
            res.forEach(element => {
              var obj ={
                solicitud: {},
                color: ''
              }
              if (element.idEstado.id == 28 || element.idEstado.id == 29 || element.idEstado.id == 30 || element.idEstado.id == 34 || element.idEstado.id == 35 || element.idEstado.id == 36 || element.idEstado.id == 37 || element.idEstado.id == 47 || element.idEstado.id == 46 || element.idEstado.id == 56 || element.idEstado.id == 54 || element.idEstado.id == 57 || element.idEstado.id == 60) {
                obj.solicitud = element
                if(element.idEstado.id == 36 || element.idEstado.id == 37){
                  obj.color = "azul"
                }else if(element.idEstado.id == 34 || element.idEstado.id == 46 || element.idEstado.id == 56 || element.idEstado.id == 60){
                  obj.color = "verde"
                }else if(element.idEstado.id == 30 || element.idEstado.id == 35 || element.idEstado.id == 47){
                  obj.color = "rojo"
                }else if(element.idEstado.id == 54){
                  obj.color = "amarillo"
                }
                this.listaSolicitudes.push(obj);
              }
            })
            this.listaSolicitudes.reverse();
            this.dataSource = new MatTableDataSource(this.listaSolicitudes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }else if(this.habilitar == false){
          this.solicitudService.listarTodos().subscribe(res => {
            res.forEach(element => {
              var obj ={
                solicitud: {},
                color: ''
              }
              if (element.idEstado.id == 28 || element.idEstado.id == 29 || element.idEstado.id == 30 || element.idEstado.id == 34 || element.idEstado.id == 35 || element.idEstado.id == 36 || element.idEstado.id == 37 || element.idEstado.id == 47 || element.idEstado.id == 46 || element.idEstado.id == 56 || element.idEstado.id == 54 || element.idEstado.id == 57 || element.idEstado.id == 60) {
                obj.solicitud = element
                if(element.idEstado.id == 28 || element.idEstado.id == 36 || element.idEstado.id == 37){
                  obj.color = "azul"
                }else if(element.idEstado.id == 29 || element.idEstado.id == 34 || element.idEstado.id == 46 || element.idEstado.id == 56 || element.idEstado.id == 57 || element.idEstado.id == 60){
                  obj.color = "verde"
                }else if(element.idEstado.id == 30 || element.idEstado.id == 35 || element.idEstado.id == 47){
                  obj.color = "rojo"
                }else if(element.idEstado.id == 54){
                  obj.color = "amarillo"
                }
                this.listaSolicitudes.push(obj);
              }
            })
            this.listaSolicitudes.reverse();
            this.dataSource = new MatTableDataSource(this.listaSolicitudes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
    })
  }

  // Lista cotizacion
  listCotizaciones: any = []
  listPdf: any = []
  pdfGuardados: any = []
  //Descargar Cotizacion Individualmente
  public descargarPdf(id: number){
    this.listCotizaciones = []
    this.servicioCotizacion.listarTodos().subscribe(resCotizaciones=>{
      resCotizaciones.forEach(elementCotizacion => {
        if(elementCotizacion.idSolicitud.id == id && elementCotizacion.idEstado.id == 33){
          this.servicioCotizacionPdf.listarTodos().subscribe(resCotiPdf=>{
            resCotiPdf.forEach(elementPdf => {
              if(elementPdf.idCotizacion.id == elementCotizacion.id && elementPdf.idEstado.id == 39){
                // this.listPdf = resPdf
                this.servicioPdf.listarTodos().subscribe(resPdf=>{
                  this.pdfGuardados = resPdf
                  this.pdfGuardados.forEach(elementpdfGuardados => {
                    if(elementpdfGuardados.name == elementPdf.nombrePdf){
                      window.location.href = elementpdfGuardados.url
                    }
                  });
                })
              }
            });
          })
        }
      });
    })
  }

  verPasos(id: number, idEstado: number){
    const dialogRef = this.dialog.open(PasosComponent, {
      width: '500px',
      height: '400px',
      data: {idSolicitud:id, idEstado: idEstado}
    });
  }

  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      data: {id: id}
    });
  }
 rechazarSolicitud(id: number){
  const dialogRef = this.dialog.open(RechazoSolicitudComponent, {
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
}
