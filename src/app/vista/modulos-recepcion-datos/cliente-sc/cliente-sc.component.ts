import { ClienteSCService } from './../../../servicios/clienteSC.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'listaUsuarios.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('usuario');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
