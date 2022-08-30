import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { AgregarEscalaSolicitudesComponent } from './agregar-escala-solicitudes/agregar-escala-solicitudes.component';
import { ModificarEscalaSolicitudesComponent } from './modificar-escala-solicitudes/modificar-escala-solicitudes.component';

@Component({
  selector: 'app-escala-solicitudes',
  templateUrl: './escala-solicitudes.component.html',
  styleUrls: ['./escala-solicitudes.component.css']
})
export class EscalaSolicitudesComponent implements OnInit {
  displayedColumns = ['id', 'descripcion','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioEscalaSolicitudes: EscalaSolicitudesService,
  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.servicioEscalaSolicitudes.listarTodos().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarEscalaSolicitudesComponent, {
      width: '500px',
    });
  }
  modificarEscalaSolicitudes(id: number): void {
    const dialogRef = this.dialog.open(ModificarEscalaSolicitudesComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarEscalaSolicitudes(id:number){
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
        this.servicioEscalaSolicitudes.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la escala.',
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
  name = 'escalaSolicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
