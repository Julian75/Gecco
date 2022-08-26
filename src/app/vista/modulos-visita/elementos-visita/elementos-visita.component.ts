import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ElementosVisitaService } from 'src/app/servicios/ElementosVisita.service';
import { AgregarElementosVisitaComponent } from './agregar-elementos-visita/agregar-elementos-visita.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModificarElementosVisitaComponent } from './modificar-elementos-visita/modificar-elementos-visita.component';

@Component({
  selector: 'app-elementos-visita',
  templateUrl: './elementos-visita.component.html',
  styleUrls: ['./elementos-visita.component.css']
})
export class ElementosVisitaComponent implements OnInit {
  dtOptions: any = {};
  public listaElementosVisita: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private elementosVisitaService: ElementosVisitaService,
    public dialog: MatDialog
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        emptyTable: "No hay datos disponibles",
        info: "Mostrando página _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        lengthMenu: "Mostrar _MENU_ registros",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "No se encontraron registros coincidentes",
        paginate: {
          first: "Primera",
          last: "Última",
          next: "Siguiente",
          previous: "Anterior"
        }
      }
    };
  }



  ngOnInit(): void {
    this.listarElementosVisita();
  }

  public listarElementosVisita() {
    this.elementosVisitaService.listarTodos().subscribe(
      (data: any) => {
        this.listaElementosVisita = data;
        this.dataSource = new MatTableDataSource(this.listaElementosVisita);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarElementosVisitaComponent, {
      width: '500px',
    });
  }

  modificarElementosVisita(id: number): void {
    const dialogRef = this.dialog.open(ModificarElementosVisitaComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarElementosVisita(id:number){
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
        this.elementosVisitaService.eliminar(id).subscribe(res=>{
          this.listarElementosVisita();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Elemento Correctamente.',
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
  name = 'listaElementosVisitas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('elementosVisita');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
