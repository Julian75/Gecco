import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { AgregarSubprocesoComponent } from './agregar-subproceso/agregar-subproceso.component';
import { ModificarSubprocesoComponent } from './modificar-subproceso/modificar-subproceso.component';
import { SubProceso } from 'src/app/modelos/subProceso';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-subproceso',
  templateUrl: './lista-subproceso.component.html',
  styleUrls: ['./lista-subproceso.component.css']
})
export class ListaSubprocesoComponent implements OnInit {

  dtOptions: any = {};
  public listarSubProceso: any = [];

  displayedColumns = ['id', 'descripcion','idProceso','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceSubProceo: SubProcesoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.serviceSubProceo.listarTodos().subscribe(res=>{
      this.listarSubProceso = res;
      this.dataSource = new MatTableDataSource(this.listarSubProceso);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public agregarSubProceso(){
    const dialogRef = this.dialog.open(AgregarSubprocesoComponent, {
      width: '500px',
    });
  }

  public modificarSubProceso(id:number){
    const dialogRef = this.dialog.open(ModificarSubprocesoComponent, {
      width: '500px',
      data: id
    });

  }


  eliminarSubProceso(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceSubProceo.eliminar(id).subscribe(res=>{
          Swal.fire(
            '¡Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
          window.location.reload()
        })
      }
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarSubProceso);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: SubProceso, filter: string) => {
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

  listadoSubProceso: any = []; //listar todos los datos del servicio subproceso
  listaSubProceso: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoSubProceso = []
    this.serviceSubProceo.listarTodos().subscribe(resSubProcesos=>{
      this.listaSubProceso = resSubProcesos
      for (let index = 0; index < this.listaSubProceso.length; index++) {
        const element = this.listaSubProceso[index];
        var obj = {
          "Id": element.id,
          "SubProceso": element.descripcion,
          "Proceso": element.idTipoProceso.descripcion,
        }
        this.listadoSubProceso.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listadoSubProceso);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaSubProcesos");
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
