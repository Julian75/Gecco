import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';

@Component({
  selector: 'app-solicitud-articulos-baja',
  templateUrl: './solicitud-articulos-baja.component.html',
  styleUrls: ['./solicitud-articulos-baja.component.css']
})
export class SolicitudArticulosBajaComponent implements OnInit {

  displayedColumns = ['id', 'asignacionArticulo', 'cantidad', 'oficina', 'sitioVenta', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaArticulos: any = [];

  constructor(
    private servicioAsignacionArticulo: AsignacionArticulosService,
  ) { }

  ngOnInit(): void {
    this.listarArticulos();
  }

  public listarArticulos(){
    this.servicioAsignacionArticulo.listarTodos().subscribe(res=>{
      res.forEach(element => {
        if(element.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id'))){
          this.listaArticulos.push(element)
          console.log(element)
        }
      });
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
  name = 'listaAsignacionPuntoVentaArticulo.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('asignacionPuntoVenta');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
