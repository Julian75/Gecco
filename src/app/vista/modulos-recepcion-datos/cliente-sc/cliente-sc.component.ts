import { ClienteSCService } from './../../../servicios/clienteSC.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ClienteSC } from 'src/app/modelos/clienteSC';

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

  name = 'listaClientes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('usuario');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
