import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { PresupuestoVentaMensualService } from 'src/app/servicios/presupuestoVentaMensual.service';

@Component({
  selector: 'app-presupuesto-venta-mensual',
  templateUrl: './presupuesto-venta-mensual.component.html',
  styleUrls: ['./presupuesto-venta-mensual.component.css']
})
export class PresupuestoVentaMensualComponent implements OnInit {
  dtOptions: any = {};
  public listarPresupuestos: any = [];

  displayedColumns = ['id', 'sitioVenta','valorPresupuesto', 'producto', 'mes', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioPresupuestoVentaMensual: PresupuestoVentaMensualService,
    // public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioPresupuestoVentaMensual.listarTodos().subscribe( res =>{
      this.listarPresupuestos = res;
      this.dataSource = new MatTableDataSource( this.listarPresupuestos);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  eliminarPresupuesto(id:number){
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
      //al fin?
      if (result.isConfirmed) {
        this.servicioPresupuestoVentaMensual.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el presupuesto de venta mensual.',
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
  name = 'listaPresupuestoVentaMensual.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('jerarquia');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
