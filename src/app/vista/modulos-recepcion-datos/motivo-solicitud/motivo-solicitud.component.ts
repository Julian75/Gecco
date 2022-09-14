import { Component, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMotivoSolicitudComponent } from './modificar-motivo-solicitud/modificar-motivo-solicitud.component';
import { AgregarMotivoSolicitudComponent } from './agregar-motivo-solicitud/agregar-motivo-solicitud.component';
@Component({
  selector: 'app-motivo-solicitud',
  templateUrl: './motivo-solicitud.component.html',
  styleUrls: ['./motivo-solicitud.component.css']
})
export class MotivoSolicitudComponent implements OnInit {
  public motivoSolicitud: any = [];
  displayedColumns = ['id', 'descripcion','area','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioMotivoSolicitud: MotivoSolicitudService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.servicioMotivoSolicitud.listarTodos().subscribe(res=>{
      res.forEach(element => {
        this.motivoSolicitud.push(element);
      });
      console.log(this.motivoSolicitud);
      this.dataSource = new MatTableDataSource(this.motivoSolicitud);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),error=>{
      console.log(error);
    }
  }
  abrirModal(){
    const dialogRef = this.dialog.open(AgregarMotivoSolicitudComponent, {
      width: '500px',
    });
  }

  modificarMotivoSolicitud(id: number): void {
    const dialogRef = this.dialog.open(ModificarMotivoSolicitudComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarMotivoSolicitud(id:number){
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
        this.servicioMotivoSolicitud.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el motivo.',
            'success'
          )
          window.location.reload()
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
  name = 'motivoSolicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
