import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

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
            if (element.idSolicitud.id == res.id) {
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaSolicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  public volver(){
    this.dialogRef.close();
  }

}
