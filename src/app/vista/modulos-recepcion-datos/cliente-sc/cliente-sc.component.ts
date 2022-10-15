import { ClienteSCService } from './../../../servicios/clienteSC.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ClienteSC } from 'src/app/modelos/clienteSC';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-cliente-sc',
  templateUrl: './cliente-sc.component.html',
  styleUrls: ['./cliente-sc.component.css']
})
export class ClienteScComponent implements OnInit {

  dtOptions: any = {};
  public listaClientesSC: any = [];

  displayedColumns = ['id', 'nombre','apellido','tipoDocumento', 'correo', 'telefono', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private servicioClienteSC: ClienteSCService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioClienteSC.listarTodos().subscribe( res =>{
      this.listaClientesSC = res;
      this.dataSource = new MatTableDataSource(this.listaClientesSC);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaClientesSC);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: ClienteSC, filter: string) => {
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

  listasClientesSC: any = []; // Es para traer todos los datos del servicio cliente servicio al cliente
  listClientesSC: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listClientesSC = []
    this.servicioClienteSC.listarTodos().subscribe(resClientesSC=>{
      this.listasClientesSC = resClientesSC
      for (let index = 0; index < this.listasClientesSC.length; index++) {
        const element = this.listasClientesSC[index];
        var obj = {
          "Id": element.id,
          "Nombre": element.nombre+" "+element.apellido,
          "Tipo Documento": element.idTipoDocumento.descripcion,
          "Documento": element.documento,
          "Correo": element.correo
        }
        this.listClientesSC.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listClientesSC);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaClientesServicioAlCliente");
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
