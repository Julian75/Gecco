import { CategoriaService } from './../../../../servicios/Categoria.service';
import { ModificarCategoriaComponent } from './modificar-categoria/modificar-categoria.component';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-articulo',
  templateUrl: './categorias-articulo.component.html',
  styleUrls: ['./categorias-articulo.component.css']
})
export class CategoriasArticuloComponent implements OnInit {
  public listaArticulos: any = [];

  displayedColumns = ['id', 'descripcion','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioCategoria: CategoriaService,
    private servicioEstado: EstadoService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioCategoria.listarTodos().subscribe( res =>{
      res.forEach(element => {
        if(element.idEstado.id == 49){
          this.listaArticulos.push(element)
        }
      });
      this.dataSource = new MatTableDataSource( this.listaArticulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarCategoriaComponent, {
      width: '500px',
    });
  }

  modificarRol(id: number): void {
    const dialogRef = this.dialog.open(ModificarCategoriaComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarRol(id:number){
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
        this.servicioCategoria.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la categoria.',
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
      window.location.reload();
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
