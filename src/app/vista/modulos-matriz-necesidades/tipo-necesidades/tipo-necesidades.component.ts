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
import * as FileSaver from 'file-saver';

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

  listadoTiposNecesidades: any = []; //listar todos los datos del servicio tipo necesidad
  listaTiposNecesidades: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoTiposNecesidades = []
    this.servicioTipoNecesidad.listarTodos().subscribe(resTipoNecesidades=>{
      this.listaTiposNecesidades = resTipoNecesidades
      for (let index = 0; index < this.listaTiposNecesidades.length; index++) {
        const element = this.listaTiposNecesidades[index];
        var obj = {
          "Id": element.id,
          "Tipo Necesidad": element.descripcion,
        }
        this.listadoTiposNecesidades.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listadoTiposNecesidades);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaTiposNecesidades");
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
