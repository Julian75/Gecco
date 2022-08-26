import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns = ['id', 'direccion','tipoDocumento', 'documento','nombre','observacion','telefono','estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioProveedor: ProveedorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listaTodos();
  }

  public listaTodos() {
    this.servicioProveedor.listarTodos().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  modificarProveedor(id: number): void {
    const dialogRef = this.dialog.open(ModificarProveedorComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarProveedor(id:number){
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
        this.servicioProveedor.eliminar(id).subscribe(res=>{
          this.listaTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Proveedor Correctamente.',
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
  name = 'listaRoles.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
