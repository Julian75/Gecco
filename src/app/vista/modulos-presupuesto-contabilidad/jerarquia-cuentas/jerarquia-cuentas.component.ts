import { JerarquiaCuentasService } from './../../../servicios/jerarquiaCuentas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarJerarquiaCuentasComponent } from './agregar-jerarquia-cuentas/agregar-jerarquia-cuentas.component';
import { ModificarJerarquiaCuentasComponent } from './modificar-jerarquia-cuentas/modificar-jerarquia-cuentas.component';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { JerarquiaCuentas } from 'src/app/modelos/jerarquiaCuentas';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-jerarquia-cuentas',
  templateUrl: './jerarquia-cuentas.component.html',
  styleUrls: ['./jerarquia-cuentas.component.css']
})
export class JerarquiaCuentasComponent implements OnInit {
  color = ('primary');
  public listaJerarquiaCuentas: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioJerarquiaCuentas: JerarquiaCuentasService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  abrirmodal(): void {
    const dialogRef = this.dialog.open(AgregarJerarquiaCuentasComponent, {
      width: '500px',
    });
  }

  public listarTodos(){
    this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquiasCuentas => {
        this.listaJerarquiaCuentas = resJerarquiasCuentas
        this.dataSource = new MatTableDataSource(this.listaJerarquiaCuentas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  modificarJerarquiaCuentas(id: number, descripcion: String): void {
    const dialogRef = this.dialog.open(ModificarJerarquiaCuentasComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarJerarquiaCuentas(id:number){
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
        this.servicioJerarquiaCuentas.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó la Jerarquia.',
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
      this.dataSource = new MatTableDataSource(this.listaJerarquiaCuentas);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: JerarquiaCuentas, filter: string) => {
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

  listadoJerarquia: any = [];
  listaJerarquiaCuentasCompletos: any = []
  exportToExcel(): void {
    this.listaJerarquiaCuentasCompletos = []
    this.servicioJerarquiaCuentas.listarTodos().subscribe(resJerarquiaCuentas=>{
      this.listadoJerarquia = resJerarquiaCuentas
      for (let index = 0; index < this.listadoJerarquia.length; index++) {
        const element = this.listadoJerarquia[index];
        var obj = {
          "Id": element.id,
          "Descripcion": element.descripcion,
        }
        this.listaJerarquiaCuentasCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaJerarquiaCuentasCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaJerarquias");
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
