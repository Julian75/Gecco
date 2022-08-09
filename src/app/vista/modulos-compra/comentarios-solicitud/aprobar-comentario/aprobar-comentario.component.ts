import { DetalleSolicitud } from './../../../../modelos/detalleSolicitud';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { Solicitud } from './../../../../modelos/solicitud';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { ListadoComentariosComponent } from './../listado-comentarios/listado-comentarios.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Solicitud2 } from 'src/app/modelos/solicitud2';
import { DetalleSolicitud2 } from 'src/app/modelos/detalleSolicitud2';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-aprobar-comentario',
  templateUrl: './aprobar-comentario.component.html',
  styleUrls: ['./aprobar-comentario.component.css']
})
export class AprobarComentarioComponent implements OnInit {
  public listaCotizaciones: any = [];
  public listaCotizacionesPdf: any = [];
  public listaSolicitud: any = [];
  public listaPdf:any = []
  public fecha: Date = new Date();

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioEstado: EstadoService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<AprobarComentarioComponent>,
    // public dialogRef2: MatDialogRef<PasosComponent>,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.listaSolicitud.push(this.data)
    this.dataSource = new MatTableDataSource( this.listaSolicitud);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  //Abrir Modal de detalle Solicitud p mano XD
  public verSolicitud(id: number){
    const dialogRef = this.dialog.open(ListadoComentariosComponent, {
      width: '1000px',
      data: {id: id}
    });
  }

  public aceptar(idSolicitud: number){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
      let solicitud : Solicitud2 = new Solicitud2();
      solicitud.id = resSolicitud.id
      this.fecha = new Date(resSolicitud.fecha)
      this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
      solicitud.fecha = this.fecha
      solicitud.idUsuario = resSolicitud.idUsuario.id
      this.servicioEstado.listarPorId(56).subscribe(resEstado=>{
        solicitud.idEstado = resEstado.id
        this.actualizarSolicitud(solicitud)
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comentario Aprobado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public rechazar(idSolicitud: number){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
      let solicitud : Solicitud2 = new Solicitud2();
      solicitud.id = resSolicitud.id
      this.fecha = new Date(resSolicitud.fecha)
      this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
      solicitud.fecha = this.fecha
      solicitud.idUsuario = resSolicitud.idUsuario.id
      this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
        solicitud.idEstado = resEstado.id
        this.actualizarSolicitud2(solicitud)
      })
    })
  }

  public actualizarSolicitud2(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(resSolicitud=>{
      this.servicioConsultasGenerales.listarDetalleSolicitudEstados(solicitud.id).subscribe(resDetalleSolicitud=>{
        console.log(resDetalleSolicitud)
        for (let index = 0; index < resDetalleSolicitud.length; index++) {
          const element = resDetalleSolicitud[index];
          let detalleSolicitud : DetalleSolicitud2 = new DetalleSolicitud2();
          detalleSolicitud.id = element.id
          detalleSolicitud.cantidad = element.cantidad
          detalleSolicitud.idArticulos = element.idArticulos
          detalleSolicitud.idSolicitud = element.idSolicitud
          detalleSolicitud.observacion = element.observacion
          detalleSolicitud.valorTotal = element.valorTotal
          detalleSolicitud.valorUnitario = element.valorUnitario
          this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
            detalleSolicitud.idEstado = resEstado.id
            this.actualizarDetalleSolicitud(detalleSolicitud)
          })
        }
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public actualizarDetalleSolicitud(detalleSolicitud: DetalleSolicitud2){
    this.servicioModificar.actualizarDetalleSolicitud(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se solicito más comentarios!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
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
