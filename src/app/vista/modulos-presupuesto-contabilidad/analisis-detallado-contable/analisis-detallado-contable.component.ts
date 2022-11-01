import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PresupuestoContableService } from 'src/app/servicios/presupuestoContable.service';

@Component({
  selector: 'app-analisis-detallado-contable',
  templateUrl: './analisis-detallado-contable.component.html',
  styleUrls: ['./analisis-detallado-contable.component.css']
})
export class AnalisisDetalladoContableComponent implements OnInit {
  dtOptions: any = {};
  public listarPresupuestosContables: any = [];

  displayedColumns = ['id', 'añoAnterior','presupuesto', 'ejecutado',];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioPresupuestoContable: PresupuestoContableService,
    // private servicioJerarquiaCuentas: JerarquiaCuentasService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioPresupuestoContable.listarTodos().subscribe(resPresupuestoContable =>{
      this.listarPresupuestosContables = resPresupuestoContable;
      this.dataSource = new MatTableDataSource( this.listarPresupuestosContables);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // if(filterValue == ""){
    //   this.dataSource = new MatTableDataSource(this.listarCuentas);
    // }else{
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    //   this.dataSource.filterPredicate = (data: , filter: string) => {
    //     const accumulator = (currentTerm, key) => {
    //       return this.nestedFilterCheck(currentTerm, data, key);
    //     };
    //     const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    //     const transformedFilter = filter.trim().toLowerCase();
    //     return dataStr.indexOf(transformedFilter) !== -1;
    //   }
    // }
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
    // this.listaCuentasCompletos = []
    // this.servicioCuentas.listarTodos().subscribe(resCuentas=>{
    //   this.listadoCuentas = resCuentas
    //   for (let index = 0; index < this.listadoCuentas.length; index++) {
    //     const element = this.listadoCuentas[index];
    //     var obj = {
    //       Id: element.id,
    //       Descripcion: element.descripcion,
    //       Codigo: element.codigo,
    //       Jerarquia: element.idJerarquia.descripcion
    //     }
    //     this.listaCuentasCompletos.push(obj)
    //   }
    //   import("xlsx").then(xlsx => {
    //     const worksheet = xlsx.utils.json_to_sheet(this.listaCuentasCompletos);
    //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, "listaCuentas");
    //   });
    // })
  }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   let EXCEL_EXTENSION = '.xlsx';
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  // }

}
