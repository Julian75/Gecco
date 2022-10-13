import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MediosRadiacionService } from 'src/app/servicios/medioRadiacion.service';
import { AgregarMediosRadiacionComponent } from './agregar-medios-radiacion/agregar-medios-radiacion.component';
import { ModificarMediosRadiacionComponent } from './modificar-medios-radiacion/modificar-medios-radiacion.component';

@Component({
  selector: 'app-lista-medios-radiacion',
  templateUrl: './lista-medios-radiacion.component.html',
  styleUrls: ['./lista-medios-radiacion.component.css']
})
export class ListaMediosRadiacionComponent implements OnInit {
  dtOptions: any = {};
  public listarMediosRadiacion: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioMediosRadiacion: MediosRadiacionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.servicioMediosRadiacion.listarTodos().subscribe(
      (res) => {
        this.listarMediosRadiacion = res;
        this.dataSource = new MatTableDataSource(this.listarMediosRadiacion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  abrirModal(){
    const dialogRef = this.dialog.open(AgregarMediosRadiacionComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTodos();
    });

  }
  modificarMedioRadiacion(id:number){
    const dialogRef = this.dialog.open(ModificarMediosRadiacionComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarTodos();
    });
  }
  eliminarMedioRadiacion(id:number){
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
        this.servicioMediosRadiacion.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el tipo documento.',
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
  name = 'listaMediosRadiacion.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('mediosRadiacion');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
