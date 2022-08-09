import { ConfiguracionService } from './../../../servicios/configuracion.service';
import { Observable } from 'rxjs';
import { Cotizacion } from './../../../modelos/cotizacion';
import { CotizacionService } from './../../../servicios/cotizacion.service';
import { Solicitud } from './../../../modelos/solicitud';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
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
import { VisualizarDetalleSolicitudComponent } from '../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Solicitud2 } from 'src/app/modelos/solicitud2';

@Component({
  selector: 'app-solicitud-conforme',
  templateUrl: './solicitud-conforme.component.html',
  styleUrls: ['./solicitud-conforme.component.css']
})
export class SolicitudConformeComponent implements OnInit {
  public listaSolicitudes: any = [];
  public fecha:Date = new Date();
  public mensajito: any;

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioSolicitud: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioModificar: ModificarService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<SolicitudConformeComponent>,
  ) { }


  ngOnInit(): void {
    this.mensaje();
  }

  public mensaje(){
    this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
      resConfiguracion.forEach(element => {
        if(element.nombre == "mensaje_solicitud_final"){
          this.mensajito = element.valor
        }
      });
    })
  }

  //Aceptacion de solicitud
  public aceptar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let solicitud : Solicitud2 = new Solicitud2();
    this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(res => {
      this.servicioEstado.listarPorId(60).subscribe(resEstado => {
        solicitud.id = res.id
        this.fecha = new Date(res.fecha)
        this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
        solicitud.fecha = this.fecha
        solicitud.idUsuario = res.idUsuario.id
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
        title: 'Solicitud finalizada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
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
