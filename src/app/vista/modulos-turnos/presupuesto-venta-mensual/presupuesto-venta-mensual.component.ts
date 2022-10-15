import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { PresupuestoVentaMensualService } from 'src/app/servicios/presupuestoVentaMensual.service';
import { PresupuestoVentaMensual } from 'src/app/modelos/presupuestoVentaMensual';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-presupuesto-venta-mensual',
  templateUrl: './presupuesto-venta-mensual.component.html',
  styleUrls: ['./presupuesto-venta-mensual.component.css']
})
export class PresupuestoVentaMensualComponent implements OnInit {
  dtOptions: any = {};
  public listarPresupuestos: any = [];

  displayedColumns = ['id', 'sitioVenta','valorPresupuesto', 'producto', 'mes', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioPresupuestoVentaMensual: PresupuestoVentaMensualService,
    // public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioPresupuestoVentaMensual.listarTodos().subscribe( res =>{
      this.listarPresupuestos = res;
      this.dataSource = new MatTableDataSource( this.listarPresupuestos);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  eliminarPresupuesto(id:number){
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
      //al fin?
      if (result.isConfirmed) {
        this.servicioPresupuestoVentaMensual.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el presupuesto de venta mensual.',
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
      this.dataSource = new MatTableDataSource(this.listarPresupuestos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: PresupuestoVentaMensual, filter: string) => {
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

  listadoPresupuestosVentaMensual: any = [];
  listaPresupuestosVentaMensualCompletos: any = []
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  exportToExcel(): void {
    this.listaPresupuestosVentaMensualCompletos = []
    this.servicioPresupuestoVentaMensual.listarTodos().subscribe(resPresupuestoVentaMensual=>{
      this.listadoPresupuestosVentaMensual = resPresupuestoVentaMensual
      const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })
      for (let index = 0; index < this.listadoPresupuestosVentaMensual.length; index++) {
        const element = this.listadoPresupuestosVentaMensual[index];
        var obj = {
          "Id": element.id,
          "Nombre Sitio Venta": element.nombreSitioVenta,
          "Valor Presupuesto": formatterPeso.format(element.valorPresupuesto),
          Mes: ''
        }
        var mesAlmacenado = new Date(element.mes)
        var mes = this.meses[Number(mesAlmacenado.getMonth())];
        obj.Mes = mes+" "+mesAlmacenado.getFullYear();
        this.listaPresupuestosVentaMensualCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaPresupuestosVentaMensualCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaPresupuestoPuntoVentaMensual");
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
