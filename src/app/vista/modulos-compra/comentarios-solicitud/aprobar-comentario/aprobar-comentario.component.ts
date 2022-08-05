import { DetalleSolicitud } from './../../../../modelos/detalleSolicitud';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { EstadoService } from './../../../../servicios/estado.service';
import { Solicitud } from './../../../../modelos/solicitud';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { ListadoComentariosComponent } from './../listado-comentarios/listado-comentarios.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

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

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioEstado: EstadoService,
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
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
      let solicitud : Solicitud = new Solicitud();
      solicitud.id = resSolicitud.id
      solicitud.fecha = resSolicitud.fecha
      solicitud.idUsuario = resSolicitud.idUsuario
      this.servicioEstado.listarPorId(56).subscribe(resEstado=>{
        solicitud.idEstado = resEstado
        this.actualizarSolicitud(solicitud)
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud){
    this.servicioSolicitud.actualizar(solicitud).subscribe(resSolicitud=>{
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
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
      let solicitud : Solicitud = new Solicitud();
      solicitud.id = resSolicitud.id
      solicitud.fecha = resSolicitud.fecha
      solicitud.idUsuario = resSolicitud.idUsuario
      this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
        solicitud.idEstado = resEstado
        this.actualizarSolicitud2(solicitud)
      })
    })
  }

  public actualizarSolicitud2(solicitud: Solicitud){
    this.servicioSolicitud.actualizar(solicitud).subscribe(resSolicitud=>{
      this.servicioDetalleSolicitud.listarTodos().subscribe(resDetalleSolicitud=>{
        for (let index = 0; index < resDetalleSolicitud.length; index++) {
          const element = resDetalleSolicitud[index];
          console.log(element)
          if(element.idSolicitud.id == solicitud.id  && element.idEstado.id == 57){
            let detalleSolicitud : DetalleSolicitud = new DetalleSolicitud();
            detalleSolicitud.id = element.id
            detalleSolicitud.cantidad = element.cantidad
            detalleSolicitud.idArticulos = element.idArticulos
            detalleSolicitud.idSolicitud = element.idSolicitud
            detalleSolicitud.observacion = element.observacion
            detalleSolicitud.valorTotal = element.valorTotal
            detalleSolicitud.valorUnitario = element.valorUnitario
            this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
              detalleSolicitud.idEstado = resEstado
              this.actualizarDetalleSolicitud(detalleSolicitud)
            })
          }
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

  public actualizarDetalleSolicitud(detalleSolicitud: DetalleSolicitud){
    this.servicioDetalleSolicitud.actualizar(detalleSolicitud).subscribe(resDetalleSolicitud=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se solicito más comentarios!',
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
