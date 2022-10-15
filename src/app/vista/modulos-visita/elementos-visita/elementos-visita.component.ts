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
import { ElementosVisita } from 'src/app/modelos/elementosVisita';
import * as FileSaver from 'file-saver';

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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaElementosVisita);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: ElementosVisita, filter: string) => {
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

  listadoElementos: any = [];
  listaElementosCompletos: any = []
  exportToExcel(): void {
    this.listaElementosCompletos = []
    this.elementosVisitaService.listarTodos().subscribe(resElementosVisita=>{
      this.listadoElementos = resElementosVisita
      for (let index = 0; index < this.listadoElementos.length; index++) {
        const element = this.listadoElementos[index];
        var obj = {
          "Id": element.id,
          "Elemento": element.descripcion,
        }
        this.listaElementosCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaElementosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaElementosVisita");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
