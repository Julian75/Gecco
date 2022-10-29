import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { UsuarioService } from './../../../servicios/usuario.service';
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
import { VisualizarDetalleSolicitudComponent } from '../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { PasosComponent } from '../pasos/pasos.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-solicitudes-realizadas',
  templateUrl: './solicitudes-realizadas.component.html',
  styleUrls: ['./solicitudes-realizadas.component.css']
})
export class SolicitudesRealizadasComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.listaSolicitudes = []
    this.solicitudService.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.idUsuario.id == Number(sessionStorage.getItem("id"))) {
          var obj ={
            solicitud: {},
            color: ''
          }
          obj.solicitud = element
          if(element.idEstado.id == 36 || element.idEstado.id == 37 || element.idEstado.id == 28){
            obj.color = "azul"
          }else if(element.idEstado.id == 34 || element.idEstado.id == 57 || element.idEstado.id == 46 || element.idEstado.id == 56 || element.idEstado.id == 60 || element.idEstado.id == 29){
            obj.color = "verde"
          }else if(element.idEstado.id == 35 || element.idEstado.id == 47 || element.idEstado.id == 30){
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

  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      height: '440px',
      data: {id: id}
    });
  }

  verPasos(id: number){
    const dialogRef = this.dialog.open(PasosComponent, {
      width: '500px',
      height: '400px',
      data: {id: id}
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaSolicitudes);
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

  listadoSolicitudesDetalleRealizadas: any = [];
  listaSolicitudesRealizadasDetalleCompletos: any = []
  exportToExcel(): void {
    this.listaSolicitudesRealizadasDetalleCompletos = []
    this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitudesDetalles=>{
      this.listadoSolicitudesDetalleRealizadas = resSolicitudesDetalles
      for (let index = 0; index < this.listadoSolicitudesDetalleRealizadas.length; index++) {
        const element = this.listadoSolicitudesDetalleRealizadas[index];
        if (element.idSolicitud.idUsuario.id == Number(sessionStorage.getItem("id")) && element.idEstado.id != 59) {
          var obj = {
            "Id Solicitud": element.idSolicitud.id,
            "Fecha": element.idSolicitud.fecha,
            "Articulo": element.idArticulos.descripcion,
            "Cantidad": element.cantidad,
            "Valor Unitario": element.valorUnitario,
            "Valor Total": element.valorTotal,
            "Observación": element.observacion,
            Estado: element.idSolicitud.idEstado.descripcion,
            "Usuario Genero Solicitud": element.idSolicitud.idUsuario.nombre+" "+element.idSolicitud.idUsuario.apellido
          }
          this.listaSolicitudesRealizadasDetalleCompletos.push(obj)
        }
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaSolicitudesRealizadasDetalleCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaSolicitudesRealizadas");
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
