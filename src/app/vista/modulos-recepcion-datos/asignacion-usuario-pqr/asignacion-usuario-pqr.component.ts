import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';
import { AgregarAsignacionUsuarioPqrComponent } from './agregar-asignacion-usuario-pqr/agregar-asignacion-usuario-pqr.component';
import { ModificarAsignacionUsuarioPqrComponent } from './modificar-asignacion-usuario-pqr/modificar-asignacion-usuario-pqr.component';
@Component({
  selector: 'app-asignacion-usuario-pqr',
  templateUrl: './asignacion-usuario-pqr.component.html',
  styleUrls: ['./asignacion-usuario-pqr.component.css']
})
export class AsignacionUsuarioPqrComponent implements OnInit {
  dtOptions: any = {};
  displayedColumns = ['id', 'usuario','area', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.servicioUsuarioPqr.listarTodos().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarAsignacionUsuarioPqrComponent, {
      width: '500px',
    });
  }

  modificarTipoDocumento(id: number): void {
    const dialogRef = this.dialog.open(ModificarAsignacionUsuarioPqrComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoDocumento(id:number){
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
        this.servicioUsuarioPqr.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó la asignación.',
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
  name = 'listaTipoDocumento.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('tipoDocumento');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
