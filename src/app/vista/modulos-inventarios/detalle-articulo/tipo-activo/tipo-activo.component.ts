import { ModificarTipoActivoComponent } from './modificar-tipo-activo/modificar-tipo-activo.component';
import { AgregarTipoActivoComponent } from './agregar-tipo-activo/agregar-tipo-activo.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoActivoService } from './../../../../servicios/tipoActivo.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { TipoActivo } from 'src/app/modelos/tipoActivo';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tipo-activo',
  templateUrl: './tipo-activo.component.html',
  styleUrls: ['./tipo-activo.component.css']
})
export class TipoActivoComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoActivo: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioTipoActivo: TipoActivoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioTipoActivo.listarTodos().subscribe( res =>{
      this.listarTipoActivo = res;
      this.dataSource = new MatTableDataSource(this.listarTipoActivo);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarTipoActivoComponent, {
      width: '500px',
    });
  }

  modificarTipoActivo(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoActivoComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoActivo(id:number){
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
        this.servicioTipoActivo.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el tipo activo.',
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
      this.dataSource = new MatTableDataSource(this.listarTipoActivo);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: TipoActivo, filter: string) => {
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

  listaTiposActivos: any = []; // Es para traer todos los datos del servicio tipo activos
  listTiposActivos: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listTiposActivos = []
    this.servicioTipoActivo.listarTodos().subscribe(resTipoActivos=>{
      this.listaTiposActivos = resTipoActivos
      for (let index = 0; index < this.listaTiposActivos.length; index++) {
        const element = this.listaTiposActivos[index];
        var obj = {
          "Id": element.id,
          "Tipo Activo": element.descripcion
        }
        this.listTiposActivos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listTiposActivos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaTiposActivos");
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
