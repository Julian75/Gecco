import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
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
import { RechazoSolicitudBajaArticuloComponent } from './rechazo-solicitud-baja-articulo/rechazo-solicitud-baja-articulo.component';
import { VisualizarActivosBajasSolicitudComponent } from '../visualizar-activos-bajas-solicitud/visualizar-activos-bajas-solicitud.component';
import { SolicitudBajasArticulos } from 'src/app/modelos/solicitudBajasArticulos';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-autorizaciones-baja-articulos',
  templateUrl: './lista-autorizaciones-baja-articulos.component.html',
  styleUrls: ['./lista-autorizaciones-baja-articulos.component.css']
})
export class ListaAutorizacionesBajaArticulosComponent implements OnInit {

  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'usuario', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceModificar: ModificarService,
    private serviceUsuario: UsuarioService,
    private serviceEstado: EstadoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    localStorage.setItem('listaAutorizacionUbicacion', 'true')
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 80){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  visualizarActivosBajas(id:number){
    const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
      width: '800px',
      height: '440px',
      data: {idSolicitudBaja: id, idContable: 0}
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
  exportToExcel(): void {
    this.listSolicitudesBajaAutorizar = []
    for (let index = 0; index < this.listarSolicitudesBajas.length; index++) {
      const element = this.listarSolicitudesBajas[index];
      var obj = {
        "Id": element.id,
        "Fecha": element.fecha,
        "Usuario Solicito": element.idUsuario.nombre+" "+element.idUsuario.apellido,
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
