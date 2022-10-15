import { TipoProcesoService } from './../../../servicios/tipoProceso.service';
import { ModificarTipoProcesoComponent } from './modificar-tipo-proceso/modificar-tipo-proceso.component';
import { AgregarTipoProcesoComponent } from './agregar-tipo-proceso/agregar-tipo-proceso.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { TipoProceso } from 'src/app/modelos/tipoProceso';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tipo-proceso',
  templateUrl: './tipo-proceso.component.html',
  styleUrls: ['./tipo-proceso.component.css']
})
export class TipoProcesoComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoProcesos: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioTipoProceso: TipoProcesoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioTipoProceso.listarTodos().subscribe( res =>{
      this.listarTipoProcesos = res;
      this.dataSource = new MatTableDataSource(this.listarTipoProcesos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarTipoProcesoComponent, {
      width: '500px',
    });
  }

  modificarTipoProceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoProcesoComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoProceso(id:number){
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
        this.servicioTipoProceso.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el tipo proceso.',
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
      this.dataSource = new MatTableDataSource(this.listarTipoProcesos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: TipoProceso, filter: string) => {
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

  listaTiposProcesos: any = []; // Es para traer todos los datos del servicio tipo proceso
  listTiposProcesos: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listTiposProcesos = []
    this.servicioTipoProceso.listarTodos().subscribe(resTipoProceso=>{
      this.listaTiposProcesos = resTipoProceso
      for (let index = 0; index < this.listaTiposProcesos.length; index++) {
        const element = this.listaTiposProcesos[index];
        var obj = {
          "Id": element.id,
          "Tipo Proceso": element.descripcion
        }
        this.listTiposProcesos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listTiposProcesos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaTiposProcesos");
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
