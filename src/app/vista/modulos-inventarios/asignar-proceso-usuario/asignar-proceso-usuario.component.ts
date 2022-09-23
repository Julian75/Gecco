import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { AgregarAsignarProcesoUsuarioComponent } from './agregar-asignar-proceso-usuario/agregar-asignar-proceso-usuario.component';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import { ModificarAsignarProcesoUsuarioComponent } from './modificar-asignar-proceso-usuario/modificar-asignar-proceso-usuario.component';

@Component({
  selector: 'app-asignar-proceso-usuario',
  templateUrl: './asignar-proceso-usuario.component.html',
  styleUrls: ['./asignar-proceso-usuario.component.css']
})
export class AsignarProcesoUsuarioComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoNovedades: any = [];

  displayedColumns = ['id', 'idUsuario', 'idTipoProceso', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioAsignacionProceso: AsignacionProcesoService,
    private dialog: MatDialog,
    private servicioUsuario: UsuarioService,
    private servicioProceso: TipoProcesoService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignacionProceso.listarTodos().subscribe( res =>{
      this.listarTipoNovedades = res;
      this.dataSource = new MatTableDataSource( this.listarTipoNovedades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  agregarAsignacionProceso(): void {
    const dialogRef = this.dialog.open(AgregarAsignarProcesoUsuarioComponent, {
      width: '500px',
    });
  }

  modificarAsignacionProceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarAsignarProcesoUsuarioComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarAsignacionProceso(id:number){
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
        this.servicioAsignacionProceso.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Tipo de novedad.',
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

  name = 'listaTipoNovedades.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('tipoNovedades');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
