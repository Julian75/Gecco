import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';

@Component({
  selector: 'app-lista-matrices-necesidades',
  templateUrl: './lista-matrices-necesidades.component.html',
  styleUrls: ['./lista-matrices-necesidades.component.css']
})
export class ListaMatricesNecesidadesComponent implements OnInit {
  dtOptions: any = {};
  public listarMatrice: any = [];

  displayedColumns = ['id','fecha','cantidad','cantidadEjecuciones','costoEstimado','costoTotal','subProceso','tipoNecesidad'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioListaMatrices: MatrizNecesidadService
  ) { }

  ngOnInit(): void {
    this.listarMatrices();
  }
  public listarMatrices(){
    this.servicioListaMatrices.listarTodos().subscribe(
      (res) => {
        this.listarMatrice = res;
        this.dataSource = new MatTableDataSource(this.listarMatrice);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err)
    );
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'listaTipoNovedades.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('tipoNovedades');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
