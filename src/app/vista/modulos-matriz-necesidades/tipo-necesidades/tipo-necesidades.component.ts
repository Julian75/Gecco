import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarTipoNecesidadesComponent } from './agregar-tipo-necesidades/agregar-tipo-necesidades.component';
import { ModificarTipoNecesidadesComponent } from './modificar-tipo-necesidades/modificar-tipo-necesidades.component';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';
import { TipoNecesidad } from 'src/app/modelos/tipoNecesidad';

@Component({
  selector: 'app-tipo-necesidades',
  templateUrl: './tipo-necesidades.component.html',
  styleUrls: ['./tipo-necesidades.component.css']
})
export class TipoNecesidadesComponent implements OnInit {

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaTipoNecesidad: any = [];

  constructor(
    public dialog: MatDialog,
    private servicioTipoNecesidad: TipoNecesidadService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  abrirmodal(): void {
    const dialogRef = this.dialog.open(AgregarTipoNecesidadesComponent, {
      width: '500px',
    });
  }

  public listarTodos(){
    this.servicioTipoNecesidad.listarTodos().subscribe(
      data => {
        this.listaTipoNecesidad = data
        this.dataSource = new MatTableDataSource(this.listaTipoNecesidad);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  modificarTipoNecesidad(id: number, descripcion: String): void {
    const dialogRef = this.dialog.open(ModificarTipoNecesidadesComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoNecesidad(id:number){
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
        this.servicioTipoNecesidad.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó el tipo de necesidad.',
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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaTipoNecesidad);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: TipoNecesidad, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  name = 'jerarquia.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('jerarquia');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
