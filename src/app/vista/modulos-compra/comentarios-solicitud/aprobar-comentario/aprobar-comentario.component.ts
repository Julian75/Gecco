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
import * as FileSaver from 'file-saver';
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


  //Abrir Modal de detalle Solicitud
  public verSolicitud(id: number){
    const dialogRef = this.dialog.open(ListadoComentariosComponent, {
      width: '1000px',
      height: '430px',
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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaSolicitud);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Solicitud, filter: string) => {
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

  listaSolicitudesAprobarRechazar: any = []
  exportToExcel(): void {
    this.listaSolicitudesAprobarRechazar = []
    for (let index = 0; index < this.listaSolicitud.length; index++) {
      const element = this.listaSolicitud[index];
      var obj = {
        "Id Solicitud": element.id,
        "Fecha": element.fecha,
        "Usuario Solicitud": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        Estado: element.idEstado.descripcion,
      }
      this.listaSolicitudesAprobarRechazar.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaSolicitudesAprobarRechazar);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaSolicitud");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public volver(){
    this.dialogRef.close();
  }
}
