import { AsignarTurnoVendedor } from './../../../modelos/asignarTurnoVendedor';
import { SolicitudEliminarTurnoVendedorComponent } from './solicitud-eliminar-turno-vendedor/solicitud-eliminar-turno-vendedor.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { UsuarioVendedoresService } from 'src/app/servicios/serviciosSiga/usuariosVendedores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-asignar-turno-vendedor',
  templateUrl: './asignar-turno-vendedor.component.html',
  styleUrls: ['./asignar-turno-vendedor.component.css']
})
export class AsignarTurnoVendedorComponent implements OnInit {

  dtOptions: any = {};
  public listaAsignarTurnoVendedor: any = [];
  public listaAsigVen: any = [];


  displayedColumns = ['id', 'nombreVendedor', 'nombreOficina', 'nombreSitioVenta', 'fechaInicio', 'fechaFinal', 'turno'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioUsuarioVendedor: UsuarioVendedoresService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignarTurnoVendedor.listarTodos().subscribe( res =>{
      res.forEach(element => {
        if(element.estado != "Eliminado"){
          this.listaAsigVen.push(element)
        }
      });
      this.listaAsignarTurnoVendedor = this.listaAsigVen;
      this.dataSource = new MatTableDataSource( this.listaAsignarTurnoVendedor);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaAsigVen);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: AsignarTurnoVendedor, filter: string) => {
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

  listadoAsigVendedor: any = [];
  listaAsigVendedorCompletos: any = []
  exportToExcel(): void {
    this.listaAsigVendedorCompletos = []
    this.servicioAsignarTurnoVendedor.listarTodos().subscribe(resAsignacionTurnoVendedor=>{
      this.listadoAsigVendedor = resAsignacionTurnoVendedor
      for (let index = 0; index < this.listadoAsigVendedor.length; index++) {
        const element = this.listadoAsigVendedor[index];
        if(element.estado != 'Eliminado'){
          var obj = {
            "Id": element.id,
            "Nombre Vendedor": element.nombreVendedor,
            "Nombre Oficina": element.nombreOficina,
            "Nombre Sitio Venta": element.nombreSitioVenta,
            "Fechas": element.fechaInicio+" - "+element.fechaFinal,
            "Turno": element.idTurno.horaInicio+" - "+element.idTurno.horaFinal+" | "+element.idTurno.idTipoTurno.descripcion,
            Estado: element.estado
          }
          this.listaAsigVendedorCompletos.push(obj)
        }
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaAsigVendedorCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAsignacionTurnoVendedor");
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
