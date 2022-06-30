import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  dtOptions: any = {};
  public listarNovedades: any = [];
  displayedColumns = ['id', 'usuario', 'turno', 'tipoNovedad', 'fecha', 'observacion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioNovedad: NovedadService,
  ) {
   }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioNovedad.listarTodos().subscribe( res =>{
      this.listarNovedades = res;
      console.log(res)
      this.dataSource = new MatTableDataSource( this.listarNovedades);
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
