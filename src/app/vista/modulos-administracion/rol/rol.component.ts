import { ModificarRolComponent } from './modificar-rol/modificar-rol.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';
import { RolService } from './../../../servicios/rol.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Rol } from 'src/app/modelos/rol';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  dtOptions: any = {};
  public listarRoles: any = [];

  displayedColumns = ['id', 'descripcion','estado', 'jerarquia','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioRol: RolService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioRol.listarTodos().subscribe( res =>{
      this.listarRoles = res;
      this.dataSource = new MatTableDataSource( this.listarRoles);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarRolComponent, {
      width: '500px',
    });
  }

  modificarRol(id: number): void {
    const dialogRef = this.dialog.open(ModificarRolComponent, {
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
        this.servicioRol.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Rol.',
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
      this.dataSource = new MatTableDataSource(this.listarRoles);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Rol, filter: string) => {
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

  listadoRoles: any = [];
  listaRolesCompletos: any = []
  exportToExcel(): void {
    this.listaRolesCompletos = []
    this.servicioRol.listarTodos().subscribe(resRoles=>{
      this.listadoRoles = resRoles
      for (let index = 0; index < this.listadoRoles.length; index++) {
        const element = this.listadoRoles[index];
        var obj = {
          Id: element.id,
          Rol: element.descripcion,
          Estado: element.idEstado.descripcion,
          Jerarquia: element.idJerarquia.descripcion
        }
        this.listaRolesCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaRolesCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaRoles");
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
