import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { AgregarAsignarPuntoVentaArticuloComponent } from './agregar-asignar-punto-venta-articulo/agregar-asignar-punto-venta-articulo.component';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';

@Component({
  selector: 'app-asignar-punto-venta-articulo',
  templateUrl: './asignar-punto-venta-articulo.component.html',
  styleUrls: ['./asignar-punto-venta-articulo.component.css']
})
export class AsignarPuntoVentaArticuloComponent implements OnInit {

  public listarAsignacionPuntoVenta: any = [];

  displayedColumns = ['id', 'asignacionArticulo', 'cantidad', 'oficina', 'sitioVenta', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioAsignacionPuntoVenta: AsignacionPuntoVentaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignacionPuntoVenta.listarTodos().subscribe( res =>{
      this.listarAsignacionPuntoVenta = res;
      this.dataSource = new MatTableDataSource(this.listarAsignacionPuntoVenta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarAsignarPuntoVentaArticuloComponent, {
      width: '500px',
    });
  }

  eliminarAsignacionPuntoVenta(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-5'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioAsignacionPuntoVenta.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la asignación del articulo al sitio de venta.',
            'success'
          )
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          '',
          'error'
        )
      }
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
