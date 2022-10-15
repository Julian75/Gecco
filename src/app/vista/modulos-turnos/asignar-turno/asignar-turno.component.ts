import { AsignarTurnoService } from './../../../servicios/asignarTurno.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignarTurno } from 'src/app/modelos/asignarTurno';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css']
})
export class AsignarTurnoComponent implements OnInit {
  dtOptions: any = {};
  public listarTurnos: any = [];
  public listarOficinas: any = [];
  public listarSitioVentas: any = [];

  displayedColumns = ['id', 'estado', 'horaInicio', 'horaFinal', 'nombreOficina', 'nombreSitioVenta', 'tipoTurno'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioAsignarTurno: AsignarTurnoService,
    private serviceOficina: OficinasService,
    private serviceSitioVenta: SitioVentaService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignarTurno.listarTodos().subscribe( res =>{
      this.listarTurnos = res;
      this.dataSource = new MatTableDataSource(this.listarTurnos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarTurnos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: AsignarTurno, filter: string) => {
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

  listadoAsigPuntVent: any = [];
  listaAsigPuntVentCompletos: any = []
  exportToExcel(): void {
    this.listaAsigPuntVentCompletos = []
    this.servicioAsignarTurno.listarTodos().subscribe(resAsignacionTurnoPuntoVenta=>{
      this.listadoAsigPuntVent = resAsignacionTurnoPuntoVenta
      for (let index = 0; index < this.listadoAsigPuntVent.length; index++) {
        const element = this.listadoAsigPuntVent[index];
        var obj = {
          "Id": element.id,
          "Hora Inicio": element.idTurnos.horaInicio,
          "Hora Final": element.idTurnos.horaFinal,
          "Nombre Oficina": element.nombreOficina,
          "Nombre Punto de Venta": element.nombreSitioVenta,
          "Tipo de Turno": element.idTurnos.idTipoTurno.descripcion,
          "Porcentaje del Turno": element.porcentaje,
          Estado: element.idEstado.descripcion
        }
        this.listaAsigPuntVentCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaAsigPuntVentCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAsignacionesTurnosPuntoVenta");
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
