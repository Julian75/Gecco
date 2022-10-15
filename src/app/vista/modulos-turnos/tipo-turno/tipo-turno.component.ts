import { ModificarTipoTurnoComponent } from './modificar-tipo-turno/modificar-tipo-turno.component';
import { AgregarTipoTurnoComponent } from './agregar-tipo-turno/agregar-tipo-turno.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoTurnoService } from 'src/app/servicios/tipoTurno.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { TipoTurno } from 'src/app/modelos/tipoTurno';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tipo-turno',
  templateUrl: './tipo-turno.component.html',
  styleUrls: ['./tipo-turno.component.css']
})
export class TipoTurnoComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoTurnos: any = [];

  displayedColumns = ['id', 'descripcion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioTipoTurno: TipoTurnoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioTipoTurno.listarTodos().subscribe( res =>{
      this.listarTipoTurnos = res;
      this.dataSource = new MatTableDataSource( this.listarTipoTurnos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarTipoTurnoComponent, {
      width: '500px',
    });
  }

  modificarTipoTurno(id: number): void {
    const dialogRef = this.dialog.open(ModificarTipoTurnoComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoTurno(id:number){
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
        this.servicioTipoTurno.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el Tipo de turno.',
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
      this.dataSource = new MatTableDataSource(this.listarTipoTurnos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: TipoTurno, filter: string) => {
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

  listadoTipoTurnos: any = [];
  listaTipoTurnosCompletos: any = []
  exportToExcel(): void {
    this.listaTipoTurnosCompletos = []
    this.servicioTipoTurno.listarTodos().subscribe(resTipoTurnos=>{
      this.listadoTipoTurnos = resTipoTurnos
      for (let index = 0; index < this.listadoTipoTurnos.length; index++) {
        const element = this.listadoTipoTurnos[index];
        var obj = {
          "Id": element.id,
          "Tipo de Turno": element.descripcion
        }
        this.listaTipoTurnosCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaTipoTurnosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaTipoTurnos");
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
