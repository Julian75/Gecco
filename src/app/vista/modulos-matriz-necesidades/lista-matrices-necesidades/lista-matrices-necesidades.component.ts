import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { VisualizarDetalleMatrizNecesidadesComponent } from './visualizar-detalle-matriz-necesidades/visualizar-detalle-matriz-necesidades.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-matrices-necesidades',
  templateUrl: './lista-matrices-necesidades.component.html',
  styleUrls: ['./lista-matrices-necesidades.component.css']
})
export class ListaMatricesNecesidadesComponent implements OnInit {
  dtOptions: any = {};
  public listarMatrice: any = [];

  displayedColumns = ['id','fecha','cantidad','cantidadEjecuciones','costoEstimado','costoTotal','subProceso','tipoNecesidad','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioListaMatrices: MatrizNecesidadService,
  ) { }

  ngOnInit(): void {
    this.listarMatrices();
  }
  public listarMatrices(){
    this.listarMatrice = []
    this.servicioListaMatrices.listarTodos().subscribe(
      (res) => {
        this.listarMatrice = res;
        console.log(this.listarMatrice)
        this.dataSource = new MatTableDataSource(this.listarMatrice);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err)
    );

  }

  visualizarMatrizNecesidad(id:Number){
    const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
      width: '1000px',
      data: id
    });
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
