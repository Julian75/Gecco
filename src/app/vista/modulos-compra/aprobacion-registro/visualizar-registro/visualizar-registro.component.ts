import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-visualizar-registro',
  templateUrl: './visualizar-registro.component.html',
  styleUrls: ['./visualizar-registro.component.css']
})
export class VisualizarRegistroComponent implements OnInit {

  public idOrdenCompra: any;
  public listarDetalle: any = [];
  displayedColumns = ['articulo','cantidad', 'valorUnitario','valorTotal'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<VisualizarRegistroComponent>,
    private servicelistaSolicitud: SolicitudService,
    private servicicioOrdenCompra: OrdenCompraService,
    private serviceDetalleSolicitud: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarDetalleSolicitud();
  }

  subtotal: any
  descuento: any
  total: any
  anticipo:any
  public listarDetalleSolicitud() {
    this.idOrdenCompra = this.data;
    this.servicicioOrdenCompra.listarPorId(this.idOrdenCompra).subscribe(resOrdenCompra=>{
      this.subtotal = resOrdenCompra.subtotal
      this.descuento = resOrdenCompra.descuento
      this.total = resOrdenCompra.valorAnticipo
      this.anticipo = resOrdenCompra.anticipoPorcentaje
      this.servicelistaSolicitud.listarPorId(resOrdenCompra.idSolicitud.id).subscribe( res => {
        this.serviceDetalleSolicitud.listarTodos().subscribe( resDetalle => {
          resDetalle.forEach(element => {
            if (element.idSolicitud.id == res.id  && element.idEstado.id != 59) {
              this.listarDetalle.push(element);
            }
          })
          this.dataSource = new MatTableDataSource( this.listarDetalle);
          console.log(this.listarDetalle)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      })
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarDetalle);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: DetalleSolicitud, filter: string) => {
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

  listaDetalleRegistro: any = []
  exportToExcel(): void {
    for (let index = 0; index < this.listarDetalle.length; index++) {
      const element = this.listarDetalle[index];
      var obj = {
        "Articulo": element.idArticulos.descripcion,
        "Cantidad": element.cantidad,
        "Valor Unitario": element.valorUnitario,
        "Valor Total Unitario": element.valorTotal,
        "Subtotal": this.subtotal,
        "Anticipo": this.anticipo,
        "Valor Anticipo": this.descuento,
        "Total": this.total
      }
      this.listaDetalleRegistro.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaDetalleRegistro);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaDetalleOrdenCompra");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public volver(){
    this.dialogRef.close();
  }
}
