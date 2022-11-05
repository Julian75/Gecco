import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { AgrearCuentasComponent } from './agrear-cuentas/agrear-cuentas.component';
import { ModificarCuentasComponent } from './modificar-cuentas/modificar-cuentas.component';
import { Cuentas } from 'src/app/modelos/cuentas';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  dtOptions: any = {};
  public listarCuentas: any = [];

  displayedColumns = ['id', 'descripcion','codigo', 'grupo','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioCuentas: CuentasService,
    private servicioJerarquiaCuentas: JerarquiaCuentasService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioCuentas.listarTodos().subscribe( resCuentas =>{
      this.listarCuentas = resCuentas;
      this.dataSource = new MatTableDataSource( this.listarCuentas);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgrearCuentasComponent, {
      width: '500px',
    });
  }

  modificarCuenta(id: number): void {
    const dialogRef = this.dialog.open(ModificarCuentasComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarCuenta(id:number){
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
        this.servicioCuentas.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la cuenta.',
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
      this.dataSource = new MatTableDataSource(this.listarCuentas);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Cuentas, filter: string) => {
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

  listadoCuentas: any = [];
  listaCuentasCompletos: any = []
  exportToExcel(): void {
    this.listaCuentasCompletos = []
    this.servicioCuentas.listarTodos().subscribe(resCuentas=>{
      this.listadoCuentas = resCuentas
      for (let index = 0; index < this.listadoCuentas.length; index++) {
        const element = this.listadoCuentas[index];
        var obj = {
          Id: element.id,
          Descripcion: element.descripcion,
          Codigo: element.codigo,
          Jerarquia: element.idJerarquiaCuentas.descripcion
        }
        this.listaCuentasCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaCuentasCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaCuentas");
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
